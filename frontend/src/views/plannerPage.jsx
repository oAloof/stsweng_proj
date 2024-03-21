import React, { useState, useEffect } from 'react'
import FullCalendar from '../components/FullCalendar'
import Form from '../components/Form'
import ModalMaker from '../components/ModalMaker'
import { TasksProvider } from '../contexts/TasksContext'

export default function PlannerPage () {
  return (
    <>
      <TasksProvider>
        <div className='w-10/12'>
          <FullCalendar />
        </div>
        <button
          className='btn'
          onClick={() => document.getElementById('my_modal_4').showModal()}
        >
          Add Task
        </button>
        <dialog id='my_modal_4' className='modal'>
          <div className='modal-box min-w-max'>
            <Form />
            <div className='modal-action justify-start'>
              <form method='dialog'>
                <button className='btn'>Close</button>
              </form>
            </div>
          </div>
        </dialog>

        <ModalMaker />
      </TasksProvider>
    </>
  )
}
