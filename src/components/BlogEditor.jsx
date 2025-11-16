"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { EditorState, ContentState, convertToRaw, convertFromHTML } from "draft-js";
import draftToHtml from "draftjs-to-html";

// Dynamically import react-draft-wysiwyg to avoid SSR issues
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { 
    ssr: false,
    loading: () => <div className="border rounded-lg p-4 bg-gray-50">Loading editor...</div>
  }
);

// Import editor styles
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function BlogEditor({ value, onChange }) {
  const [editorState, setEditorState] = useState(() => {
    if (value) {
      try {
        const blocksFromHTML = convertFromHTML(value);
        const contentState = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );
        return EditorState.createWithContent(contentState);
      } catch (error) {
        console.error("Error parsing HTML:", error);
        return EditorState.createEmpty();
      }
    }
    return EditorState.createEmpty();
  });

  useEffect(() => {
    if (value && !editorState.getCurrentContent().hasText()) {
      try {
        const blocksFromHTML = convertFromHTML(value);
        const contentState = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );
        setEditorState(EditorState.createWithContent(contentState));
      } catch (error) {
        console.error("Error parsing HTML:", error);
      }
    }
  }, [value]);

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
    const html = draftToHtml(convertToRaw(newEditorState.getCurrentContent()));
    onChange(html);
  };

  const toolbar = {
    options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'image', 'history'],
    inline: {
      options: ['bold', 'italic', 'underline', 'strikethrough'],
    },
    blockType: {
      inDropdown: true,
      options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote'],
    },
    list: {
      options: ['unordered', 'ordered'],
    },
  };

  return (
    <div className="blog-editor border border-gray-300 rounded-lg bg-white" style={{ minHeight: "450px" }}>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbar={toolbar}
        editorClassName="px-4 py-2"
        editorStyle={{ minHeight: "400px" }}
      />
    </div>
  );
}


