import React, { useState } from 'react'
import DatePicker from 'react-datepicker' // Assuming DatePicker is exported from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import './DatePicker.css'

export default function MyDatePicker ({ onChange, value }) {
  return (
    <>
      <div>
        <div>Due Date</div>
        <DatePicker
          selected={value}
          onChange={onChange}
          placeholderText='Select Date'
        />
      </div>
    </>
  )
}
