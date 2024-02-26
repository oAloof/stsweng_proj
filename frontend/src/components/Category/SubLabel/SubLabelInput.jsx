import TagsInput from 'react-tagsinput'
// import "react-tagsinput/react-tagsinput.css";

export default function SubLabel ({ onChange, value }) {
  return (
    <>
      <h1>Sub-label</h1>
      <div className='relative transition-all duration-300 w-full border-gray-300 dark:bg-slate-800 dark:text-white/80 dark:border-slate-600 rounded-lg tracking-wide font-light text-sm placeholder-gray-400 bg-white focus-within:ring-1 focus-within:ring-offset-1 disabled:opacity-40 disabled:cursor-not-allowed focus-within:border-blue-500 focus-within:ring-blue-500/20 max-w-xs '>
        <TagsInput
          value={value}
          onChange={onChange}
          inputProps={{
            placeholder: 'Input Sub-Label'
          }}
        />
      </div>
    </>
  )
}
