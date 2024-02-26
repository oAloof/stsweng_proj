import React from 'react'

export default function TitleInput ({ onChange, value }) {
  return (
    <>
      <div>TitleInput</div>
      <input
        type='text'
        placeholder='Title'
        className='input input-bordered w-full max-w-xs '
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    </>
  )
}
