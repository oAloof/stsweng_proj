import React, { useState } from "react";
import TagsInput from "react-tagsinput";
import "./CategoryInput.css";

const Category = () => {
  const [category, setCategory] = useState([]);

  const handleChange = (category) => {
    setCategory(category);
  };

  return (
    <>
      <h1>Category</h1>
      <div className="relative transition-all duration-300 w-full border-gray-300 dark:bg-slate-800 dark:text-white/80 dark:border-slate-600 rounded-lg tracking-wide font-light text-sm placeholder-gray-400 bg-white focus-within:ring-1 focus-within:ring-offset-1 disabled:opacity-40 disabled:cursor-not-allowed focus-within:border-blue-500 focus-within:ring-blue-500/20 max-w-xs ">
        <TagsInput
          maxTags={1}
          value={category}
          onChange={handleChange}
          inputProps={{
            placeholder: "Input Category",
          }}
        />
      </div>
    </>
  );
};

export default Category;
//
