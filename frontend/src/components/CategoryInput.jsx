import React, { useState } from "react";
import TagsInput from "react-tagsinput";
// import "react-tagsinput/react-tagsinput.css";
import "./CategoryInput.css";

const Category = () => {
  const [category, setCategory] = useState([]);

  const handleChange = (category) => {
    setCategory(category);
  };

  return (
    <TagsInput
      maxTags={1}
      value={category}
      onChange={handleChange}
      inputProps={{
        placeholder: "Input Category",
      }}
    />
  );
};

export default Category;
