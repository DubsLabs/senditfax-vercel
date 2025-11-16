import Link from "next/link";
import Image from "next/image";

export default function BlogPostCard({ post }) {
  return (
    <Link 
      href={`/blog/${post.slug}`}
      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {post.image && (
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {post.title}
        </h2>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <span className="font-medium">{post.author}</span>
            <span>{post.readingTime}</span>
          </div>
          
          {post.publishedAt && (
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          )}
        </div>
      </div>
    </Link>
  );
}


