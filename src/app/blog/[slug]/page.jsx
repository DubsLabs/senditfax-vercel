import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumbs from "../../../components/Breadcrumbs";
import FullSEO from "../../../config/FullSEO";
import { getPostBySlug, getAllPostSlugs } from "../../../utils/wordpress";

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

  return (
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
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
        )}
      </header>

      <div
        className="prose prose-slate prose-lg max-w-none
          prose-headings:text-gray-900
          prose-p:text-gray-700
          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-gray-900
          prose-img:rounded-lg
          prose-blockquote:border-l-blue-600 prose-blockquote:bg-blue-50 prose-blockquote:py-2
          prose-ul:text-gray-700 prose-ol:text-gray-700
          prose-li:text-gray-700
          prose-code:text-gray-900 prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded
          prose-pre:bg-gray-900 prose-pre:text-gray-100"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="mt-12 pt-8 border-t border-gray-200">
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
  );
}

