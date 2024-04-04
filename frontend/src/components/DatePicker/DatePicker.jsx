import DatePicker from 'react-datepicker' // Assuming DatePicker is exported from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import './DatePicker.css'

export default function MyDatePicker ({ handleOnChange, value }) {
  return (
    <>
      <div>
        <div>Due Date</div>
        <DatePicker
          className='input input-bordered w-full max-w-xs'
          // value={value}
          preventOpenOnFocus
          selected={value ? new Date(value) : null}
          onChange={(date) => handleOnChange(date.toISOString())}
          minDate={new Date()}
          showTimeSelect
          timeFormat='h:mm aa'
          dateFormat='MMMM d h:mm aa'
          placeholderText='Select Date and Time'
        />
      </div>
    </>
  )
}
