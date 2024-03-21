import React, { useState, useEffect } from 'react'
import Table from '../components/Table'
import Form from '../components/Form'
import ModalMaker from '../components/ModalMaker'
import { TasksProvider } from '../contexts/TasksContext'

export default function EmpathyPage () {
  return (
    <>
      <div className='flex justify-center min-w-full py-5'>
        <TasksProvider>
          <div className='flex flex-col justify-center w-11/12'>
            <div className='border-black border-2	'>
              <Table className='' />
            </div>

            <div className='max-w-sm flex space-x-4 mt-4'>
              <button
                className='btn'
                onClick={() => document.getElementById('my_modal_4').showModal()}
              >
                Genrate SubTasks
              </button>
              <button
                className='btn'
                onClick={() => document.getElementById('my_modal_5').showModal()}
              >
                Add Tasks
              </button>
            </div>

          </div>
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

          <dialog id='my_modal_5' className='modal'>
            <div className='modal-box min-w-max'>
              <p>Tasks Sucesssfully Added!</p>
              <div className='modal-action justify-start'>
                <form method='dialog'>
                  <button className='btn'>Close</button>
                </form>
              </div>
            </div>
          </dialog>

          <ModalMaker />
        </TasksProvider>

      </div>
    </>

  )
}
