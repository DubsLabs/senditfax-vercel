import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogPostCard from "@/components/BlogPostCard";
import FullSEO from "@/config/FullSEO";

export const metadata = {
  ...FullSEO.Blog,
  alternates: {
    canonical: "https://senditfax.com/blog",
  },
};

async function getBlogPosts() {
  try {
    const response = await fetch("https://nextfaxapi-dlreibwmnq-uc.a.run.app/blogPosts", {
      cache: "no-store", // Always fetch fresh data for blog posts
    });
    
    if (!response.ok) {
      throw new Error("Failed to fetch blog posts");
    }
    
    const data = await response.json();
    return data.posts || [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumbs items={[{ label: "Blog", href: "/blog" }]} />
      
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">SendItFax Blog</h1>
        <p className="text-lg text-gray-600">
          Tips, guides, and insights about online faxing, document management, and digital communication.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts yet</h3>
          <p className="text-gray-600">Check back soon for new content!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      )}
      
      <div className="mt-12 text-center">
        <Link 
          href="/" 
          className="inline-block text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}


