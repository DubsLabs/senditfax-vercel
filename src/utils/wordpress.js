const WORDPRESS_API_URL = "https://blog.senditfax.com/wp-json/wp/v2";

// Default cache lifetime for WordPress data (ISR). Posts change rarely, and
// per-request fetching made every blog view hit WordPress 3-4 times.
const DEFAULT_REVALIDATE = 3600;

const SITE_HOSTS = ["senditfax.com", "www.senditfax.com"];
const BLOG_HOST_PATTERN = /^https?:\/\/blog\.senditfax\.com/i;
// WordPress permalinks look like https://blog.senditfax.com/2026/10/09/slug/
const BLOG_PERMALINK_PATTERN = /^https?:\/\/blog\.senditfax\.com\/(?:\d{4}\/\d{2}\/\d{2}\/)?([^/?#"']+)\/?(?=$|[?#])/i;

function isSiteUrl(href) {
  try {
    const { hostname } = new URL(href);
    return SITE_HOSTS.includes(hostname.toLowerCase());
  } catch {
    return false;
  }
}

/**
 * Rewrites a single href from post HTML:
 * - links to the WordPress permalink of a post become /blog/<slug>
 * - any other blog.senditfax.com link becomes /blog
 * Everything else (including image URLs, which are not hrefs) is untouched.
 */
export function rewriteBlogHref(href) {
  if (!href || !BLOG_HOST_PATTERN.test(href)) return href;
  const permalink = href.match(BLOG_PERMALINK_PATTERN);
  if (permalink && !/^(wp-|feed$|category$|tag$|author$|page$)/i.test(permalink[1])) {
    return `/blog/${permalink[1]}`;
  }
  return "/blog";
}

/**
 * Rewrites anchor tags in WordPress-rendered HTML so that:
 * - internal links point at senditfax.com/blog instead of the WordPress host
 *   (otherwise hundreds of internal links leak to the duplicate subdomain)
 * - external links carry rel="nofollow noopener" so the blog does not pass
 *   link equity to third parties (most of them competitors)
 */
export function rewritePostHtml(html) {
  if (!html) return "";
  return html.replace(/<a\b([^>]*?)>/gi, (tag, attrs) => {
    const hrefMatch = attrs.match(/\bhref\s*=\s*(["'])(.*?)\1/i);
    if (!hrefMatch) return tag;
    const [hrefAttr, quote, href] = hrefMatch;
    const newHref = rewriteBlogHref(href.trim());
    let newAttrs = attrs.replace(hrefAttr, `href=${quote}${newHref}${quote}`);

    const isExternal = /^https?:\/\//i.test(newHref) && !isSiteUrl(newHref);
    if (isExternal) {
      const relMatch = newAttrs.match(/\brel\s*=\s*(["'])(.*?)\1/i);
      if (relMatch) {
        const values = new Set(relMatch[2].split(/\s+/).filter(Boolean));
        values.add("nofollow");
        values.add("noopener");
        newAttrs = newAttrs.replace(relMatch[0], `rel=${relMatch[1]}${[...values].join(" ")}${relMatch[1]}`);
      } else {
        newAttrs += ' rel="nofollow noopener"';
      }
    }
    return `<a${newAttrs}>`;
  });
}

/**
 * fetch() against the WordPress API with a couple of retries on server or
 * network errors. The WordPress host is small and returns 500s under load
 * (e.g. during a build), and a failed fetch must never be cached as "no post".
 */
async function wpFetch(url, revalidateTime, retries = 2) {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, { next: { revalidate: revalidateTime } });
      if (response.ok) return response;
      lastError = new Error(`WordPress API error: ${response.status}`);
      if (response.status < 500) throw lastError; // 4xx will not get better
    } catch (error) {
      lastError = error;
    }
    if (attempt < retries) {
      await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)));
    }
  }
  throw lastError;
}

/**
 * Calculates reading time for a post based on text content
 * @param {string} content - HTML content of the post
 * @returns {number} - Reading time in minutes
 */
export function calculateReadingTime(content) {
  if (!content) return 0;

  // Remove HTML tags and get clean text
  const textContent = content.replace(/<[^>]*>/g, "").trim();
  
  // Average reading speed: 200-250 words per minute
  // Using 200 words/min for conservative estimate
  const wordsPerMinute = 200;
  const wordCount = textContent.split(/\s+/).filter(word => word.length > 0).length;
  
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return readingTime || 1; // Minimum 1 minute
}

/**
 * Gets image URL by featured_media ID
 * @param {number} mediaId - Image ID in WordPress
 * @returns {Promise<string|null>} - Image URL or null
 */
export async function getFeaturedImageUrl(mediaId, revalidateTime = DEFAULT_REVALIDATE) {
  if (!mediaId) return null;

  try {
    const response = await wpFetch(
      `${WORDPRESS_API_URL}/media/${mediaId}?_fields=source_url`,
      revalidateTime
    );

    const media = await response.json();
    return media.source_url || null;
  } catch (error) {
    console.error("Error fetching featured image:", error);
    return null;
  }
}

/**
 * Gets list of posts with pagination
 * @param {number} page - Page number (starts from 1)
 * @param {number} perPage - Number of posts per page
 * @returns {Promise<{posts: Array, totalPages: number, total: number}>}
 */
export async function getPosts(page = 1, perPage = 10, revalidateTime = DEFAULT_REVALIDATE) {
  try {
    const fields = "id,slug,title,excerpt,content,featured_media,date,link";
    const response = await wpFetch(
      `${WORDPRESS_API_URL}/posts?_fields=${fields}&page=${page}&per_page=${perPage}&_embed`,
      revalidateTime
    );

    const posts = await response.json();
    const totalPosts = parseInt(response.headers.get("x-wp-total") || "0", 10);
    const totalPages = parseInt(response.headers.get("x-wp-totalpages") || "1", 10);

    // Process posts: get images and calculate reading time
    const processedPosts = await Promise.all(
      posts.map(async (post) => {
        let featuredImageUrl = null;

        // Try to get image from _embedded if available
        if (post._embedded && post._embedded["wp:featuredmedia"] && post._embedded["wp:featuredmedia"][0]) {
          featuredImageUrl = post._embedded["wp:featuredmedia"][0].source_url || null;
        }

        // If failed to get from _embedded, make separate request
        if (!featuredImageUrl && post.featured_media) {
          featuredImageUrl = await getFeaturedImageUrl(post.featured_media, revalidateTime);
        }

        // Calculate reading time based on full content for accurate reading time
        const readingTime = calculateReadingTime(post.content?.rendered || "");

        return {
          id: post.id,
          slug: post.slug,
          title: post.title?.rendered || "",
          excerpt: rewritePostHtml(post.excerpt?.rendered || ""),
          featuredImage: featuredImageUrl,
          date: post.date,
          link: post.link,
          readingTime,
        };
      })
    );

    return {
      posts: processedPosts,
      totalPages,
      total: totalPosts,
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      posts: [],
      totalPages: 0,
      total: 0,
      currentPage: page,
    };
  }
}

/**
 * Gets a single post by slug
 * @param {string} slug - Post slug
 * @returns {Promise<Object|null>} - Post data or null
 */
export async function getPostBySlug(slug, revalidateTime = DEFAULT_REVALIDATE) {
  try {
    const fields = "id,slug,title,content,excerpt,featured_media,date,modified";
    const response = await wpFetch(
      `${WORDPRESS_API_URL}/posts?slug=${slug}&_fields=${fields}&_embed`,
      revalidateTime
    );

    const posts = await response.json();

    if (!posts || posts.length === 0) {
      return null;
    }

    const post = posts[0];

    // Get image
    let featuredImageUrl = null;

    // Try to get from _embedded
    if (post._embedded && post._embedded["wp:featuredmedia"] && post._embedded["wp:featuredmedia"][0]) {
      featuredImageUrl = post._embedded["wp:featuredmedia"][0].source_url || null;
    }

    // If failed, make separate request
    if (!featuredImageUrl && post.featured_media) {
      featuredImageUrl = await getFeaturedImageUrl(post.featured_media, revalidateTime);
    }

    // Calculate reading time based on full content
    const readingTime = calculateReadingTime(post.content?.rendered || "");

    return {
      id: post.id,
      slug: post.slug,
      title: post.title?.rendered || "",
      content: rewritePostHtml(post.content?.rendered || ""),
      excerpt: rewritePostHtml(post.excerpt?.rendered || ""),
      featuredImage: featuredImageUrl,
      date: post.date,
      modified: post.modified,
      link: post.link || `/blog/${post.slug}`,
      readingTime,
    };
  } catch (error) {
    // Rethrow: the caller treats null as "no such post" (404). An API failure
    // must surface as an error so ISR does not cache a 404 for a real post.
    console.error("Error fetching post by slug:", error);
    throw error;
  }
}

/**
 * Gets slug/date/modified for every post, walking all pages of the API.
 * A single page of 100 silently dropped everything past the newest 100.
 * @param {number} revalidateTime - Revalidation time in seconds
 * @returns {Promise<Array<{slug: string, date: string, modified: string}>>}
 */
export async function getAllPostSummaries(revalidateTime = DEFAULT_REVALIDATE) {
  const summaries = [];
  try {
    let page = 1;
    let totalPages = 1;
    do {
      const response = await wpFetch(
        `${WORDPRESS_API_URL}/posts?_fields=id,slug,title,date,modified&per_page=100&page=${page}&orderby=date&order=desc`,
        revalidateTime
    );

      totalPages = parseInt(response.headers.get("x-wp-totalpages") || "1", 10);
      const posts = await response.json();
      for (const post of posts) {
        summaries.push({
          id: post.id,
          slug: post.slug,
          title: post.title?.rendered || "",
          date: post.date,
          modified: post.modified,
        });
      }
      page += 1;
    } while (page <= totalPages);
  } catch (error) {
    console.error("Error fetching post summaries:", error);
  }
  return summaries;
}

/**
 * Gets all post slugs for static path generation
 * @param {number} revalidateTime - Revalidation time in seconds
 * @returns {Promise<Array<string>>} - Array of slugs
 */
export async function getAllPostSlugs(revalidateTime = DEFAULT_REVALIDATE) {
  const summaries = await getAllPostSummaries(revalidateTime);
  return summaries.map((post) => post.slug);
}

/**
 * Gets related posts (excluding current post)
 * @param {number} currentPostId - Current post ID to exclude
 * @param {number} limit - Number of related posts to return
 * @returns {Promise<Array>} - Array of related posts
 */
export async function getRelatedPosts(currentPostId, limit = 3, revalidateTime = DEFAULT_REVALIDATE) {
  try {
    const fields = "id,slug,title,excerpt,featured_media,date";
    const response = await wpFetch(
      `${WORDPRESS_API_URL}/posts?_fields=${fields}&exclude=${currentPostId}&per_page=${limit}&_embed`,
      revalidateTime
    );

    const posts = await response.json();
    
    const processedPosts = await Promise.all(
      posts.map(async (post) => {
        let featuredImageUrl = null;
        if (post._embedded && post._embedded["wp:featuredmedia"] && post._embedded["wp:featuredmedia"][0]) {
          featuredImageUrl = post._embedded["wp:featuredmedia"][0].source_url || null;
        }
        if (!featuredImageUrl && post.featured_media) {
          featuredImageUrl = await getFeaturedImageUrl(post.featured_media, revalidateTime);
        }

        return {
          id: post.id,
          slug: post.slug,
          title: post.title?.rendered || "",
          excerpt: rewritePostHtml(post.excerpt?.rendered || ""),
          featuredImage: featuredImageUrl,
          date: post.date,
        };
      })
    );

    return processedPosts;
  } catch (error) {
    console.error("Error fetching related posts:", error);
    return [];
  }
}

/**
 * Gets previous and next posts for navigation
 * @param {number} currentPostId - Current post ID
 * @returns {Promise<{prev: Object|null, next: Object|null}>}
 */
export async function getPrevNextPosts(currentPostId, revalidateTime = DEFAULT_REVALIDATE) {
  try {
    // Summaries cover every post (newest first); a single page of 100 did not.
    const posts = await getAllPostSummaries(revalidateTime);
    const currentIndex = posts.findIndex((post) => post.id === currentPostId);

    if (currentIndex === -1) {
      return { prev: null, next: null };
    }

    const prevPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
    const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : null;

    return {
      prev: prevPost ? { slug: prevPost.slug, title: prevPost.title } : null,
      next: nextPost ? { slug: nextPost.slug, title: nextPost.title } : null,
    };
  } catch (error) {
    console.error("Error fetching prev/next posts:", error);
    return { prev: null, next: null };
  }
}
