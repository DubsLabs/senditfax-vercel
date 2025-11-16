"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import AdminAuth, { useAdminPassword } from "@/components/AdminAuth";
import useAlertStore from "@/store/useAlertStore";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const password = useAdminPassword();
  const [addInfo, addWarning, addError] = useAlertStore((state) => [
    state.addInfo,
    state.addWarning,
    state.addError,
  ]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://nextfaxapi-dlreibwmnq-uc.a.run.app/blogPosts");
      
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      addError("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      const response = await fetch(`https://nextfaxapi-dlreibwmnq-uc.a.run.app/blogPosts/${slug}`, {
        method: "DELETE",
        headers: {
          "X-Admin-Password": password,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      addInfo("Post deleted successfully");
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      addError("Failed to delete post");
    }
  };

  return (
    <AdminAuth>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
          <Link
            href="/admin/blog/new"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            + Create New Post
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600 mb-4">Create your first blog post to get started</p>
            <Link
              href="/admin/blog/new"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Post
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Published
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{post.title}</div>
                      <div className="text-sm text-gray-500">{post.description.slice(0, 60)}...</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {post.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/blog/${post.slug}/edit`}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(post.slug, post.title)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminAuth>
  );
}


