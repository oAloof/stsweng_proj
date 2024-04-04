import TagsInput from 'react-tagsinput'
// import "react-tagsinput/react-tagsinput.css";

export default function SubLabel({ handleOnChange, value }) {
  return (
    <>
      <div>
        <h1>Sub-label</h1>
        <div className="">
          <TagsInput
            value={value}
            onChange={handleOnChange}
            inputProps={{
              placeholder: 'Input Sub-Label'
            }}
          />
        </div>
      </div>
    </>
  )
}
