import React, { useState } from "react";

function getDate() {
  const date = new Date();
  const result = date.toISOString().split("T")[0];
  return result;
}

export default function TimeStamp() {
  const [currentDate] = useState(getDate());

  return (
    <>
      <div>Written On</div>
      <div>{currentDate}</div>
    </>
  );
  //YYYY-MM-DD
}
