const WORDPRESS_API_URL = "https://blog.senditfax.com/wp-json/wp/v2";

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
export async function getFeaturedImageUrl(mediaId) {
  if (!mediaId) return null;

  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/media/${mediaId}?_fields=source_url`,
      {
        next: { revalidate: 0 }, // Always fresh data
      }
    );

    if (!response.ok) return null;

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
export async function getPosts(page = 1, perPage = 10) {
  try {
    const fields = "id,slug,title,excerpt,content,featured_media,date,link";
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?_fields=${fields}&page=${page}&per_page=${perPage}&_embed`,
      {
        next: { revalidate: 0 }, // Always fresh data
      }
    );

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

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
          featuredImageUrl = await getFeaturedImageUrl(post.featured_media);
        }

        // Calculate reading time based on full content for accurate reading time
        const readingTime = calculateReadingTime(post.content?.rendered || "");

        return {
          id: post.id,
          slug: post.slug,
          title: post.title?.rendered || "",
          excerpt: post.excerpt?.rendered || "",
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
export async function getPostBySlug(slug, revalidateTime = 0) {
  try {
    const fields = "id,slug,title,content,excerpt,featured_media,date,modified";
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?slug=${slug}&_fields=${fields}&_embed`,
      {
        next: { revalidate: revalidateTime },
      }
    );

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

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
      featuredImageUrl = await getFeaturedImageUrl(post.featured_media);
    }

    // Calculate reading time based on full content
    const readingTime = calculateReadingTime(post.content?.rendered || "");

    return {
      id: post.id,
      slug: post.slug,
      title: post.title?.rendered || "",
      content: post.content?.rendered || "",
      excerpt: post.excerpt?.rendered || "",
      featuredImage: featuredImageUrl,
      date: post.date,
      modified: post.modified,
      link: post.link || `/blog/${post.slug}`,
      readingTime,
    };
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return null;
  }
}

/**
 * Gets all post slugs for static path generation
 * @param {number} revalidateTime - Revalidation time in seconds (default: 3600 for sitemap)
 * @returns {Promise<Array<string>>} - Array of slugs
 */
export async function getAllPostSlugs(revalidateTime = 3600) {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?_fields=slug&per_page=100`,
      {
        next: { revalidate: revalidateTime },
      }
    );

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const posts = await response.json();
    return posts.map((post) => post.slug);
  } catch (error) {
    console.error("Error fetching post slugs:", error);
    return [];
  }
}

/**
 * Gets related posts (excluding current post)
 * @param {number} currentPostId - Current post ID to exclude
 * @param {number} limit - Number of related posts to return
 * @returns {Promise<Array>} - Array of related posts
 */
export async function getRelatedPosts(currentPostId, limit = 3) {
  try {
    const fields = "id,slug,title,excerpt,featured_media,date";
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?_fields=${fields}&exclude=${currentPostId}&per_page=${limit}&_embed`,
      {
        next: { revalidate: 0 },
      }
    );

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const posts = await response.json();
    
    const processedPosts = await Promise.all(
      posts.map(async (post) => {
        let featuredImageUrl = null;
        if (post._embedded && post._embedded["wp:featuredmedia"] && post._embedded["wp:featuredmedia"][0]) {
          featuredImageUrl = post._embedded["wp:featuredmedia"][0].source_url || null;
        }
        if (!featuredImageUrl && post.featured_media) {
          featuredImageUrl = await getFeaturedImageUrl(post.featured_media);
        }

        return {
          id: post.id,
          slug: post.slug,
          title: post.title?.rendered || "",
          excerpt: post.excerpt?.rendered || "",
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
export async function getPrevNextPosts(currentPostId) {
  try {
    // Get all posts to find neighbors
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?_fields=id,slug,title&orderby=date&order=desc&per_page=100`,
      {
        next: { revalidate: 0 },
      }
    );

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status}`);
    }

    const posts = await response.json();
    const currentIndex = posts.findIndex((post) => post.id === currentPostId);

    if (currentIndex === -1) {
      return { prev: null, next: null };
    }

    const prevPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;
    const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : null;

    return {
      prev: prevPost ? { slug: prevPost.slug, title: prevPost.title?.rendered || "" } : null,
      next: nextPost ? { slug: nextPost.slug, title: nextPost.title?.rendered || "" } : null,
    };
  } catch (error) {
    console.error("Error fetching prev/next posts:", error);
    return { prev: null, next: null };
  }
}

