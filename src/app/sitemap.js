import { getAllPostSlugs, getPostBySlug } from '../utils/wordpress';

// Enable ISR for sitemap - revalidate every hour
export const revalidate = 3600; // 1 hour

export default async function sitemap() {
  const baseUrl = 'https://senditfax.com';

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/calculator`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/how-to-send-fax-online`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/how-to-send-fax-for-doctors`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/how-to-send-fax-for-lawyers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/how-to-send-fax-personal`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/how-to-send-fax-for-small-business`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/status`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Get blog posts dynamically
  let blogPosts = [];
  try {
    // Use revalidate: 3600 for sitemap to allow static generation
    const slugs = await getAllPostSlugs(3600);
    const postsData = await Promise.all(
      slugs.map(async (slug) => {
        try {
          // Use revalidate: 3600 for sitemap to allow static generation
          const post = await getPostBySlug(slug, 3600);
          if (post) {
            return {
              url: `${baseUrl}/blog/${slug}`,
              lastModified: post.modified ? new Date(post.modified) : (post.date ? new Date(post.date) : new Date()),
              changeFrequency: 'weekly',
              priority: 0.8,
            };
          }
          return null;
        } catch (error) {
          console.error(`Error fetching post ${slug}:`, error);
          return null;
        }
      })
    );
    blogPosts = postsData.filter(post => post !== null);
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
    // Continue with static pages if blog posts fail
  }

  return [...staticPages, ...blogPosts];
}

