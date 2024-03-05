import React from 'react'
export default function TimeStamp ({ date }) {
  return (
    <>
      <div>
        <div>Written On</div>
        <input
          type='text'
          placeholder={date} // Access date prop directly
          className='input input-bordered w-full max-w-xs'
          disabled // make the input field read-only
        />
      </div>
    </>
  )
}
