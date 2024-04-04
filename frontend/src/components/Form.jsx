import React, { useContext, useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import TitleInput from './TitleInput'
import TextEditor from './TextEditor/TextEditor'
import DatePicker from './DatePicker/DatePicker'
import TimeStamp from './TimeStamp'
import SubLabel from './Category/SubLabel/SubLabelInput'
import Category from './Category/CategoryInput'
import Difficulty from './DifficultyInput'
import { TasksContext } from '../contexts/TasksContext'

export default function Form({ eventData, method }) {
  const { createTask, updateTask } = useContext(TasksContext)
  const { handleSubmit, control, setValue, reset } = useForm()

  useEffect(() => {
    if (eventData) {
      Object.keys(eventData).forEach((field) => {
        // Ignore the _id field
        if (field === '_id') return
        setValue(field, eventData[field])
      })
      document.getElementById('task-modal-btn').value = 'Update'
    } else {
      reset()
    }
  }, [eventData, setValue, reset])

  const onSubmit = (data) => {
    document.getElementById('my_modal_4').close()
    const dataToSend = {
      taskName: data.title,
      category: data.category[0],
      label: data.subLabel,
      description: data.description,
      difficulty: data.difficulty,
      deadline: data.end,
      start: data.start
    }
    if (eventData) {
      // Add the _id field to the dataToSend object
      dataToSend._id = eventData._id
      updateTask(dataToSend)
    } else {
      createTask(dataToSend)
    }
    reset()
  }

  function handleDelete() {
    console.log('delete')
    method('delete')
    document.getElementById('my_modal_4').close()
  }

  function getDate() {
    const date = new Date()
    const result = date.toISOString().split('T')[0]
    return result
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <input
        className="btn btn-ghost float float-end"
        id="delete-task-button"
        type="button" // Change type to "button"
        value="delete"
        onClick={handleDelete} // Attach onClick event handler
      />

      {/* <svg
        className="btn btn-ghost float float-end"
        id="delete-task-button"
        type="button" // Change type to "button"
        value="delete"
        onClick={handleDelete} // Attach onClick event handler
        class="w-6 h-6 text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          fill-rule="evenodd"
          d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
          clip-rule="evenodd"
        />
      </svg> */}

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
            render={({ field }) => (
              <Difficulty onChange={field.onChange} value={field.value} />
            )}
            name="difficulty"
            control={control}
            defaultValue={0.5}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <input
          id="task-modal-btn"
          className="btn flex absolute mt-6"
          type="submit"
          value="Submit"
        />
      </div>
    </form>
  )
}
