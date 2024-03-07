import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import TitleInput from './TitleInput'
import TextEditor from './TextEditor/TextEditor'
import DatePicker from './DatePicker/DatePicker'
import TimeStamp from './TimeStamp'
import SubLabel from './Category/SubLabel/SubLabelInput'
import Category from './Category/CategoryInput'
import Difficulty from './DifficultyInput'

export default function Form({ setEvents, events, event }) {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: event // Pre-fill form fields with event data
  })

  const onSubmit = (data) => {
    // console.log(data)
    setEvents([...events, data])
    reset()
  }

  function getDate() {
    const date = new Date()
    const result = date.toISOString().split('T')[0]
    return result
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="flex">
        <div className="m-5 flex flex-col space-y-4">
          <div className="flex space-x-4">
            <Controller
              name="end"
              control={control}
              render={() => <TimeStamp date={getDate()} />}
              defaultValue={getDate()}
            />

            <Controller
              name="start"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <DatePicker
                  handleOnChange={field.onChange}
                  value={field.value}
                />
              )}
            />
          </div>

          <div className="flex-col space-y-4">
            <Controller
              render={({ field }) => (
                <TitleInput
                  handleOnChange={field.onChange}
                  value={field.value}
                />
              )}
              name="title"
              control={control}
              defaultValue=""
            />

            <Controller
              render={({ field }) => (
                <TextEditor
                  handleOnChange={field.onChange}
                  value={field.value}
                />
              )}
              name="description"
              control={control}
              defaultValue=""
            />
          </div>
        </div>

        <div className="m-5 flex-col space-y-4">
          <Controller
            render={({ field }) => (
              <Category handleOnChange={field.onChange} value={field.value} />
            )}
            name="category"
            control={control}
            defaultValue={[]}
          />

          <Controller
            render={({ field }) => (
              <SubLabel handleOnChange={field.onChange} value={field.value} />
            )}
            name="subLabel"
            control={control}
            defaultValue={[]}
          />

          <Controller
            render={({ field }) => <Difficulty onChange={field.onChange} />}
            name="rating"
            control={control}
            defaultValue={0.5}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <input
          className="btn flex absolute mt-6"
          type="submit"
          value="Submit"
        />
      </div>
    </form>
  )
}
