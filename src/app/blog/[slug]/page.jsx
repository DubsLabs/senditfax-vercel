import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import Script from "next/script";

async function getBlogPost(slug) {
  try {
    const response = await fetch(`https://nextfaxapi-dlreibwmnq-uc.a.run.app/blogPosts/${slug}`, {
      cache: "no-store",
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return data.post;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    return {
      title: "Post Not Found - SendItFax Blog",
    };
  }
  
  return {
    title: `${post.title} - SendItFax Blog`,
    description: post.description,
    alternates: {
      canonical: `https://senditfax.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      images: post.image ? [
        {
          url: `https://senditfax.com${post.image}`,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
      url: `https://senditfax.com/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.image ? [`https://senditfax.com${post.image}`] : [],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: post.image ? `https://senditfax.com${post.image}` : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "SendItFax",
      logo: {
        "@type": "ImageObject",
        url: "https://senditfax.com/og-meta-senditfax.jpg",
      },
    },
  };

  return (
    <>
      <Script
        id={`structured-data-article-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
      <article className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs 
          items={[
            { label: "Blog", href: "/blog" },
            { label: post.title, href: `/blog/${post.slug}` }
          ]} 
        />
        
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-4 text-gray-600 mb-6">
            <span className="font-medium">{post.author}</span>
            <span>•</span>
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            {post.description}
          </p>
        </header>
        
        {post.image && (
          <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        )}
        
        <div 
          className="prose prose-lg prose-blue max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <Link 
              href="/blog" 
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Blog
            </Link>
            
            <Link 
              href="/" 
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Send a Fax →
            </Link>
          </div>
        </footer>
      </article>
    </>
  );
}


