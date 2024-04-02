import React from 'react'

export default function NameInput({ handleOnChange, value, placeholder }) {
  return (
    <>
      <div>
        <input
          type="text"
          placeholder={placeholder}
          className="input input-bordered w-full max-w-xs "
          onChange={(e) => handleOnChange(e.target.value)}
          value={value}
        />
      </div>
    </>
  )
}
