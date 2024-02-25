import React, { useState } from "react";
import DatePicker from "react-datepicker"; // Assuming DatePicker is exported from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css";

export default function MyDatePicker({ onChange, value }) {
  return (
    <DatePicker
      selected={value} 
      onChange={onChange}
    />
  );
}