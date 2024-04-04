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

export default function Form ({eventData}) {
  const { createTask, updateTask } = useContext(TasksContext)
  const { handleSubmit, control, setValue, reset } = useForm()

  useEffect(() => {
    if (eventData) {
      Object.keys(eventData).forEach(field => {
        // Ignore the _id field
        if (field === '_id') return
          setValue(field, eventData[field])
      }) 
      document.getElementById('task-modal-btn').value = 'Update'
    } else {
      reset()
    }
  }, [eventData, setValue, reset]);

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

  function getDate () {
    const date = new Date()
    const result = date.toISOString().split('T')[0]
    return result
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=''>
      <div className='flex'>
        <div className='m-5 flex flex-col space-y-4'>
          <div className='flex space-x-4'>
            <Controller
              name='start'
              control={control}
              render={() => <TimeStamp date={getDate()} />}
              defaultValue={getDate()}
            />

            <Controller
              name='end'
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

          <div className='flex-col space-y-4'>
            <Controller
              render={({ field }) => (
                <TitleInput
                  handleOnChange={field.onChange}
                  value={field.value}
                />
              )}
              name='title'
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
              name='description'
              control={control}
              defaultValue=''
            />
          </div>
        </div>

        <div className='m-5 flex-col space-y-4'>
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
            render={({ field }) => (
              <Difficulty onChange={field.onChange} value={field.value} />
            )}
            name='difficulty'
            control={control}
            defaultValue={0.5}
          />
        </div>
      </div>

      <div className='flex justify-end'>
        <input
          id="task-modal-btn"
          className='btn flex absolute mt-6'
          type='submit'
          value='Submit'
        />
      </div>
    </form>
  )
}
