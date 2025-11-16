"use client";
import { useMemo } from "react";
import dynamic from "next/dynamic";

// Dynamically import react-quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { 
  ssr: false,
  loading: () => <div className="border rounded-lg p-4 bg-gray-50">Loading editor...</div>
});

// Import Quill styles
import "react-quill/dist/quill.snow.css";

export default function BlogEditor({ value, onChange }) {
  const modules = useMemo(() => ({
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image", "video"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  }), []);

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
    "color",
    "background",
  ];

  return (
    <div className="blog-editor">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        className="bg-white"
        style={{ height: "400px", marginBottom: "50px" }}
      />
    </div>
  );
}


