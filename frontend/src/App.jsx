import React, { useState } from 'react'
import Form from './components/Form'
import FullCalendar from './components/FullCalendar'
import ModalMaker from './components/ModalMaker'

export default function App () {
  const [events, setEvents] = useState([])
  // there's gonna be other fields also like start, end.
  const handleSetEvents = (newEvents) => {
    setEvents(newEvents)
  }

  return (
    <>
      <div className='w-10/12'>
        <FullCalendar events={events} />
      </div>
      <button
        className='btn'
        onClick={() => document.getElementById('my_modal_4').showModal()}
      >
        Add Task
      </button>
      <dialog id='my_modal_4' className='modal'>
        <div className='modal-box min-w-max'>
          <Form setEvents={handleSetEvents} />
          <div className='modal-action'>
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <button className='btn'>Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <ModalMaker />
    </>
  )
}
