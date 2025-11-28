import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumbs from "../../../components/Breadcrumbs";
import FullSEO from "../../../config/FullSEO";
import { getPostBySlug, getAllPostSlugs, getRelatedPosts, getPrevNextPosts } from "../../../utils/wordpress";
import Script from "next/script";
import { generateBreadcrumbSchema } from "../../../utils/breadcrumbSchema";
import SocialShare from "../../../components/SocialShare";
import ReadingProgress from "../../../components/ReadingProgress";

export const dynamic = "force-dynamic"; // Always fresh data, no caching

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found - SendItFax Blog",
      description: "The requested blog post could not be found.",
    };
  }

  const excerpt = post.excerpt
    ? post.excerpt.replace(/<[^>]*>/g, "").substring(0, 160)
    : FullSEO.BlogPost.description;

  return {
    title: `${post.title} | SendItFax Blog`,
    description: excerpt,
    alternates: {
      canonical: `https://senditfax.com/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: excerpt,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: post.featuredImage
        ? [
            {
              url: post.featuredImage,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
      url: `https://senditfax.com/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Strip HTML from title for breadcrumb schema
  const postTitlePlain = post.title.replace(/<[^>]*>/g, '');
  const postExcerptPlain = post.excerpt ? post.excerpt.replace(/<[^>]*>/g, '').substring(0, 160) : '';

  // Get related posts and navigation
  const [relatedPosts, navigation] = await Promise.all([
    getRelatedPosts(post.id, 3),
    getPrevNextPosts(post.id),
  ]);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { label: "Blog", href: "/blog" },
    { label: postTitlePlain, href: `/blog/${slug}` },
  ]);

  // Article Schema for SEO
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: postTitlePlain,
    description: postExcerptPlain,
    image: post.featuredImage ? [post.featuredImage] : [],
    datePublished: post.date,
    dateModified: post.modified || post.date,
    author: {
      "@type": "Organization",
      name: "SendItFax",
      url: "https://senditfax.com",
    },
    publisher: {
      "@type": "Organization",
      name: "SendItFax",
      url: "https://senditfax.com",
      logo: {
        "@type": "ImageObject",
        url: "https://senditfax.com/og-meta-senditfax.jpg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://senditfax.com/blog/${slug}`,
    },
  };

  const postUrl = `https://senditfax.com/blog/${slug}`;

  return (
    <>
      <ReadingProgress />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />
      <article className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Blog", href: "/blog" },
            { label: post.title, href: `/blog/${slug}` },
          ]}
        />

      <header className="mb-8">
        <h1
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          dangerouslySetInnerHTML={{ __html: post.title }}
        />

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
          <time dateTime={post.date} className="flex items-center gap-1">
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {formatDate(post.date)}
          </time>
          {post.readingTime > 0 && (
            <span className="flex items-center gap-1">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {post.readingTime} min read
            </span>
          )}
        </div>

        {post.featuredImage && (
          <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-8">
            <Image
              src={post.featuredImage}
              alt={post.title.replace(/<[^>]*>/g, '')}
              fill
              className="object-cover"
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
        )}
      </header>

      <div
        className="prose prose-slate prose-lg max-w-none
          prose-headings:text-gray-900 prose-headings:font-bold prose-headings:leading-tight
          prose-h1:text-4xl prose-h1:mt-8 prose-h1:mb-4
          prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2
          prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3
          prose-h4:text-xl prose-h4:mt-4 prose-h4:mb-2
          prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-base
          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
          prose-strong:text-gray-900 prose-strong:font-semibold
          prose-img:rounded-lg prose-img:shadow-md prose-img:my-8 prose-img:mx-auto
          prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:my-8 prose-blockquote:italic prose-blockquote:text-gray-700
          prose-ul:text-gray-700 prose-ul:my-6 prose-ul:space-y-2
          prose-ol:text-gray-700 prose-ol:my-6 prose-ol:space-y-2
          prose-li:text-gray-700 prose-li:leading-relaxed prose-li:pl-2
          prose-code:text-gray-900 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
          prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:p-4 prose-pre:my-6 prose-pre:overflow-x-auto
          prose-hr:my-8 prose-hr:border-gray-300
          prose-table:my-8 prose-table:w-full
          prose-th:bg-gray-100 prose-th:font-semibold prose-th:p-3
          prose-td:p-3 prose-td:border-t prose-td:border-gray-200"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Social Share */}
      <SocialShare title={post.title} url={postUrl} />

      {/* Prev/Next Navigation */}
      {(navigation.prev || navigation.next) && (
        <nav className="mt-8 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {navigation.prev ? (
              <Link
                href={`/blog/${navigation.prev.slug}`}
                className="group p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous Post
                </div>
                <div className="font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2" dangerouslySetInnerHTML={{ __html: navigation.prev.title }} />
              </Link>
            ) : (
              <div></div>
            )}
            {navigation.next ? (
              <Link
                href={`/blog/${navigation.next.slug}`}
                className="group p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-right md:text-left"
              >
                <div className="flex items-center justify-end md:justify-start gap-2 text-sm text-gray-500 mb-2">
                  Next Post
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2" dangerouslySetInnerHTML={{ __html: navigation.next.title }} />
              </Link>
            ) : null}
          </div>
        </nav>
      )}

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.id}
                href={`/blog/${relatedPost.slug}`}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                {relatedPost.featuredImage && (
                  <div className="relative w-full h-40 overflow-hidden">
                    <Image
                      src={relatedPost.featuredImage}
                      alt={relatedPost.title.replace(/<[^>]*>/g, '')}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-4 flex flex-col flex-grow">
                  <h3
                    className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors"
                    dangerouslySetInnerHTML={{ __html: relatedPost.title }}
                  />
                  <div
                    className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow"
                    dangerouslySetInnerHTML={{
                      __html: relatedPost.excerpt.replace(/<[^>]*>/g, '').substring(0, 100) + '...',
                    }}
                  />
                  <span className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center gap-1 mt-auto">
                    Read more
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Back to Blog */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Blog
        </Link>
      </div>
    </article>
    </>
  );
}

