import React, { useEffect, useRef, useContext, useState } from 'react'
import Table from '../components/AccountPage/Table'
import { TasksContext } from '../contexts/TasksContext'

export default function PlannerSidebar ({ setEventEdit }) {
  const [edit, setEdit] = useState(false)
  const [del, setDelete] = useState(false)
  const { planningTasks } = useContext(TasksContext)

  const viewEdit = () => {
    setEdit(true)
  }

  const noEdit = () => {
    setEdit(false)
  }

  const viewDelete = () => {
    setDelete(true)
  }

  const noDelete = () => {
    setDelete(false)
  }

  const finalSubmit = () => {
    setEventEdit(false)
    document.getElementById('my_modal_5').close()
    console.log('??')
  }

  return (
    <div className='w-2/12 flex flex-col shadow p-5 space-y-5 relative min-w-[150px] max-h-min'>
      <p class='font-semibold	text-xl'>Planner</p>
      <button
        className='btn'
        onClick={() => document.getElementById('my_modal_4').showModal()}
      >
        Add Task
      </button>
      <button className='btn' onClick={viewEdit}>
        Edit Task
      </button>
      {edit && (
        <div className='flex flex-col'>
          <button
            className='btn btn-sm btn-circle btn-ghost absolute right-2 -mt-1'
            onClick={noEdit}
          >
            ✕
          </button>
          <p class='font-semibold mr-5 mb-3'>How to Edit Tasks:</p>
          <ol class='list-decimal ml-5'>
            <li>Drag tasks within the calendar to change its date.</li>
            <li>
              Click on the task you want to edit and change the details in the
              modal.
            </li>
          </ol>
        </div>
      )}
      <button className='btn' onClick={viewDelete}>
        Delete Task
      </button>
      {del && (
        <div className='flex flex-col'>
          <button
            className='btn btn-sm btn-circle btn-ghost absolute right-2 -mt-1'
            onClick={noDelete}
          >
            ✕
          </button>
          <p class='font-semibold mr-5 mb-3'>How to Delete Tasks:</p>
          <ol class='list-decimal ml-5'>
            <li>
              Click on the task you want to delete and click the delete button.
            </li>
          </ol>
        </div>
      )}
      <div>
        <p class='stat-title '>Planned Tasks: </p>
        <div className='stat-value text-secondary'>{planningTasks.length}</div>
      </div>
      <button
        className='btn'
        onClick={() => document.getElementById('my_modal_5').showModal()}
      >
        Finalize Tasks
      </button>
      <dialog id='my_modal_5' className='modal'>
        <div className='modal-box w-11/12 max-w-5xl'>
          <h3 className='font-bold text-lg'>Finalize Tasks</h3>
          <p className='py-2'>Check if the task details are correct</p>
          <div className='flex space-x-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 stroke-accent'
              viewBox='0 0 24 24'
              fill='none'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z' />
              <line x1='12' y1='9' x2='12' y2='13' />
              <line x1='12' y1='17' x2='12.01' y2='17' />
            </svg>
            <p className='text-sm'>
              Changing of deadline once confirmed will incur exp decuction
            </p>
          </div>
          <Table />
          <div className='modal-action flex justify-between'>
            <button className='btn' onClick={() => finalSubmit()}>
              Submit Tasks
            </button>
            <form method='dialog'>
              <button className='btn'>Back</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}
