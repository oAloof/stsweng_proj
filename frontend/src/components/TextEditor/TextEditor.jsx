import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./TextEditor.css";

export default function TextEditor({ onChange, value }) {
  return (
    <>
      <div>Description</div>
      <ReactQuill
        className="max-w-96 relative transition-all duration-300 w-full border-gray-300 dark:bg-slate-800 dark:text-white/80 dark:border-slate-600 rounded-lg tracking-wide font-light text-sm placeholder-gray-400 bg-white focus-within:ring-1 focus-within:ring-offset-1 disabled:opacity-40 disabled:cursor-not-allowed focus-within:border-blue-500 focus-within:ring-blue-500/20"
        theme="snow"
        onChange={onChange}
        value={value}
      />
    </>
  );
}
