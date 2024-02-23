import React, { useState } from "react";
import TagsInput from "react-tagsinput";
// import "react-tagsinput/react-tagsinput.css";
import "./CategoryInput.css";

const SubLabel = () => {
  const [subLabel, setSubLabel] = useState([]);

  const handleChange = (label) => {
    setSubLabel(label);
  };

  return (
    <TagsInput
      value={subLabel}
      onChange={handleChange}
      inputProps={{
        placeholder: "Input Sub-Label",
      }}
    />
  );
};

export default SubLabel;
