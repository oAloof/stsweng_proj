import React, { useState } from 'react'

function getDate () {
  const date = new Date()
  const result = date.toISOString().split('T')[0]
  return result
}

export default function TimeStamp () {
  const [currentDate] = useState(getDate())

  return (
    <>
      <div>
        <div>Written On</div>
        <input
          type='text'
          placeholder={currentDate}
          className='input input-bordered w-full max-w-xs'
          disabled
        />
      </div>
    </>
  )
  // YYYY-MM-DD
}
