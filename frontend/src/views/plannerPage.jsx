import React, { useState, useEffect } from 'react'
import FullCalendar from '../components/FullCalendar'
import Form from '../components/Form'
import ModalMaker from '../components/ModalMaker'
import NavBar from '../components/NavBar'

export default function PlannerPage () {
  const [selectedEventData, setSelectedEventData] = useState(null)

  const handleEventClick = (data) => {
    setSelectedEventData(data)
    document.getElementById('my_modal_4').showModal()
  }

  const closeModal = () => {
    document.getElementById('my_modal_4').close();
    setSelectedEventData(null) // Reset for next use
  };

  return (
    <>
      <NavBar/>
      <div className='flex p-10 space-x-5'>
        <div className='w-2/12 flex-col shadow'>
          <button
            className='btn'
            onClick={() => document.getElementById('my_modal_4').showModal()}
          >
            Add Task
          </button>
        </div>
        <div className='w-10/12 flex-col'>
          <FullCalendar onEventClick={handleEventClick} />
        </div>
      </div>
      <dialog id='my_modal_4' className='modal'>
        <div className='modal-box min-w-max'>
          <Form eventData={selectedEventData} />
          <div className='modal-action justify-start'>
            <form method='dialog'>
              <button className='btn' onClick={closeModal}>Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}
