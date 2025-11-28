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
export async function getPostBySlug(slug) {
  try {
    const fields = "id,slug,title,content,excerpt,featured_media,date,modified";
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?slug=${slug}&_fields=${fields}&_embed`,
      {
        next: { revalidate: 0 }, // Always fresh data
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
 * @returns {Promise<Array<string>>} - Array of slugs
 */
export async function getAllPostSlugs() {
  try {
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?_fields=slug&per_page=100`,
      {
        next: { revalidate: 0 },
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

