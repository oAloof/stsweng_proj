import React from 'react'

export default function TitleInput ({ handleOnChange, value }) {
  return (
    <>
      <div>
        <div>TitleInput</div>
        <input
          id='Title'
          type='text'
          placeholder='Title'
          className='input input-bordered w-full max-w-xs '
          onChange={(e) => handleOnChange(e.target.value)}
          value={value}
          defaultValue=''
        />
      </div>
    </>
  )
}
