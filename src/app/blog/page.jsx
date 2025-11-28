import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "../../components/Breadcrumbs";
import FullSEO from "../../config/FullSEO";
import { getPosts } from "../../utils/wordpress";
import Script from "next/script";
import { generateBreadcrumbSchema } from "../../utils/breadcrumbSchema";

export const dynamic = "force-dynamic"; // Always fresh data, no caching

export const metadata = {
  ...FullSEO.Blog,
  alternates: {
    canonical: "https://senditfax.com/blog",
  },
};

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function stripHtml(html) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
}

export default async function BlogPage({ searchParams }) {
  const currentPage = parseInt(searchParams?.page || "1", 10);
  const { posts, totalPages, total, currentPage: page } = await getPosts(currentPage, 10);
  const breadcrumbSchema = generateBreadcrumbSchema([{ label: "Blog", href: "/blog" }]);

  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <section className="max-w-7xl mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "Blog", href: "/blog" }]} />

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
        <p className="text-lg text-gray-600">
          Tips, guides, and news about online faxing and digital communication
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No posts found.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                {post.featuredImage && (
                  <Link href={`/blog/${post.slug}`} className="block relative w-full h-48 overflow-hidden">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </Link>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-3 flex items-center gap-3 text-sm text-gray-500">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    {post.readingTime > 0 && (
                      <>
                        <span>•</span>
                        <span>{post.readingTime} min read</span>
                      </>
                    )}
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-blue-600 transition-colors"
                      dangerouslySetInnerHTML={{ __html: post.title }}
                    />
                  </h2>
                  <div
                    className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow"
                    dangerouslySetInnerHTML={{
                      __html: post.excerpt || stripHtml(post.excerpt),
                    }}
                  />
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center gap-1 mt-auto"
                  >
                    Read more
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav
              className="flex items-center justify-center gap-2 mt-8"
              aria-label="Blog pagination"
            >
              {page > 1 ? (
                <Link
                  href={`/blog?page=${page - 1}`}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Previous
                </Link>
              ) : (
                <span className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-400 cursor-not-allowed">
                  Previous
                </span>
              )}

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  // Show only first 3, last 3 and current page with context
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= page - 1 && pageNum <= page + 1)
                  ) {
                    return (
                      <Link
                        key={pageNum}
                        href={`/blog?page=${pageNum}`}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          pageNum === page
                            ? "bg-blue-600 text-white font-medium"
                            : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </Link>
                    );
                  } else if (pageNum === page - 2 || pageNum === page + 2) {
                    return (
                      <span key={pageNum} className="px-2 text-gray-500">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              {page < totalPages ? (
                <Link
                  href={`/blog?page=${page + 1}`}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Next
                </Link>
              ) : (
                <span className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-400 cursor-not-allowed">
                  Next
                </span>
              )}
            </nav>
          )}

          <div className="text-center text-sm text-gray-500 mt-4">
            Showing {posts.length} of {total} posts
          </div>
        </>
      )}
    </section>
    </>
  );
}

