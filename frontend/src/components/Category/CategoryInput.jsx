import TagsInput from 'react-tagsinput'
import './CategoryInput.css'

export default function Category ({ handleOnChange, value }) {
  return (
    <>
      <div>
        <h1>Category</h1>
        <div className=''>
          <TagsInput
            maxTags={1}
            value={value}
            onChange={handleOnChange}
            inputProps={{
              placeholder: 'Input Category'
            }}
          />
        </div>
      </div>
    </>
  )
}

//
