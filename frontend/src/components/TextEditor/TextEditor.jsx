import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './TextEditor.css'

export default function TextEditor ({ handleOnChange, value }) {
  return (
    <>
      <div>
        <div>Description</div>
        <ReactQuill theme='snow' onChange={handleOnChange} value={value} />
      </div>
    </>
  )
}
