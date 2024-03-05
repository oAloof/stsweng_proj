import { useForm, Controller } from 'react-hook-form'
import TitleInput from './TitleInput'
import TextEditor from './TextEditor/TextEditor'
import DatePicker from './DatePicker/DatePicker'
import TimeStamp from './TimeStamp'
import SubLabel from './Category/SubLabel/SubLabelInput'
import Category from './Category/CategoryInput'
import Difficulty from './DifficultyInput'

export default function Form ({ setEvents }) {
  const { handleSubmit, control } = useForm()
  const onSubmit = (data) => {
    console.log(data)
    // Assuming data has the necessary structure for events
    // Update the events in the parent component (App)
    setEvents([data])
  }
  // watch input value by passing the name of it
  function getDate () {
    const date = new Date()
    const result = date.toISOString().split('T')[0]
    return result
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=''>
      <div className='flex'>
        <div className='m-5'>
          <div className='flex space-x-4'>
            <Controller
              name='start'
              control={control}
              render={() => <TimeStamp date={getDate()} />}
              defaultValue={getDate()}
            />

            <Controller
              name='dueDate'
              control={control}
              defaultValue={null} // Set default value to null
              render={({ field }) => (
                <DatePicker
                  handleOnChange={field.onChange}
                  value={field.value}
                />
              )} // Pass the field object to MyDatePicker component
            />
          </div>

          <div>
            <Controller
              render={({ field }) => (
                <TitleInput
                  handleOnChange={field.onChange}
                  value={field.value}
                />
              )}
              name='title'
              control={control}
              defaultValue=''
            />

            <Controller
              render={({ field }) => (
                <TextEditor
                  handleOnChange={field.onChange}
                  value={field.value}
                />
              )}
              name='description'
              control={control}
              defaultValue=''
            />
          </div>
        </div>

        <div className='m-5'>
          <Controller
            render={({ field }) => (
              <Category handleOnChange={field.onChange} value={field.value} />
            )}
            name='category'
            control={control}
            defaultValue={[]}
          />

          <Controller
            render={({ field }) => (
              <SubLabel handleOnChange={field.onChange} value={field.value} />
            )}
            name='subLabel'
            control={control}
            defaultValue={[]}
          />

          <Controller
            render={({ field }) => <Difficulty onChange={field.onChange} />}
            name='rating'
            control={control}
            defaultValue={0.5}
          />
        </div>
      </div>

      <input className='btn absolute mt-6' type='submit' />
    </form>
  )
}
