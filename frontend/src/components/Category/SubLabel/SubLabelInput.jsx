import React, { useState } from "react";
import TagsInput from "react-tagsinput";
// import "react-tagsinput/react-tagsinput.css";

const SubLabel = () => {
  const [subLabel, setSubLabel] = useState([]);

  const handleChange = (label) => {
    setSubLabel(label);
  };

  return (
    <>
      <h1>Sub-label</h1>
      <div className="relative transition-all duration-300 w-full border-gray-300 dark:bg-slate-800 dark:text-white/80 dark:border-slate-600 rounded-lg tracking-wide font-light text-sm placeholder-gray-400 bg-white focus-within:ring-1 focus-within:ring-offset-1 disabled:opacity-40 disabled:cursor-not-allowed focus-within:border-blue-500 focus-within:ring-blue-500/20 max-w-xs ">
        <TagsInput
          value={subLabel}
          onChange={handleChange}
          inputProps={{
            placeholder: "Input Sub-Label",
          }}
        />
      </div>
    </>
  );
};

export default SubLabel;
