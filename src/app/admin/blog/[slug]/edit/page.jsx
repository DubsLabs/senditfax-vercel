"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminAuth, { useAdminPassword } from "@/components/AdminAuth";
import BlogEditor from "@/components/BlogEditor";
import useAlertStore from "@/store/useAlertStore";

export default function EditBlogPostPage({ params }) {
  const router = useRouter();
  const password = useAdminPassword();
  const [addInfo, addWarning, addError] = useAlertStore((state) => [
    state.addInfo,
    state.addWarning,
    state.addError,
  ]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    author: "",
    readingTime: "",
  });
  const [currentImage, setCurrentImage] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPost, setLoadingPost] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [params.slug]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`https://nextfaxapi-dlreibwmnq-uc.a.run.app/blogPosts/${params.slug}`);
      
      if (!response.ok) {
        throw new Error("Post not found");
      }
      
      const data = await response.json();
      const post = data.post;
      
      setFormData({
        title: post.title,
        description: post.description,
        content: post.content,
        author: post.author,
        readingTime: post.readingTime,
      });
      setCurrentImage(post.image || "");
    } catch (error) {
      console.error("Error fetching post:", error);
      addError("Failed to load post");
      router.push("/admin/blog");
    } finally {
      setLoadingPost(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = currentImage;

      // Upload new image if provided
      if (newImage) {
        const imageFormData = new FormData();
        imageFormData.append("image", newImage);

        const imageResponse = await fetch("/api/blog/upload-image", {
          method: "POST",
          headers: {
            "x-admin-password": password,
          },
          body: imageFormData,
        });

        if (!imageResponse.ok) {
          throw new Error("Failed to upload image");
        }

        const imageData = await imageResponse.json();
        imageUrl = imageData.imageUrl;
      }

      // Update post
      const postData = {
        title: formData.title,
        description: formData.description,
        content: formData.content,
        author: formData.author,
        readingTime: formData.readingTime,
        image: imageUrl,
      };

      const response = await fetch(`https://nextfaxapi-dlreibwmnq-uc.a.run.app/blogPosts/${params.slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update post");
      }

      addInfo("Post updated successfully!");
      router.push("/admin/blog");
    } catch (error) {
      console.error("Error updating post:", error);
      addError(error.message || "Failed to update post");
    } finally {
      setLoading(false);
    }
  };

  if (loadingPost) {
    return (
      <AdminAuth>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading post...</p>
          </div>
        </div>
      </AdminAuth>
    );
  }

  return (
    <AdminAuth>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Post</h1>
          <p className="text-gray-600">Update the details of your blog post</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Enter post title"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Brief description of the post"
                rows={3}
                required
              />
            </div>

            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                Author *
              </label>
              <input
                type="text"
                id="author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Author name"
                required
              />
            </div>

            <div>
              <label htmlFor="readingTime" className="block text-sm font-medium text-gray-700 mb-2">
                Reading Time
              </label>
              <input
                type="text"
                id="readingTime"
                value={formData.readingTime}
                onChange={(e) => setFormData({ ...formData, readingTime: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="e.g., 5 min read"
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Featured Image
              </label>
              {currentImage && !imagePreview && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Current image:</p>
                  <img src={currentImage} alt="Current" className="max-w-xs rounded-lg" />
                </div>
              )}
              <input
                type="file"
                id="image"
                onChange={handleImageChange}
                accept="image/*"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              {imagePreview && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">New image preview:</p>
                  <img src={imagePreview} alt="Preview" className="max-w-xs rounded-lg" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <BlogEditor
                value={formData.content}
                onChange={(value) => setFormData({ ...formData, content: value })}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.push("/admin/blog")}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:bg-blue-400"
            >
              {loading ? "Updating..." : "Update Post"}
            </button>
          </div>
        </form>
      </div>
    </AdminAuth>
  );
}


