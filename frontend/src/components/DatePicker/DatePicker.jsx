import DatePicker from 'react-datepicker' // Assuming DatePicker is exported from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import './DatePicker.css'

export default function MyDatePicker ({ handleOnChange, value }) {
  return (
    <>
      <div>
        <div>Due Date</div>
        <DatePicker
          selected={value}
          onChange={handleOnChange}
          placeholderText='Select Date'
        />
      </div>
    </>
  )
}
