import React, { useState, useEffect } from 'react'
import FullCalendar from '../components/FullCalendar'
import Form from '../components/Form'
import ModalMaker from '../components/ModalMaker'

export default function PlannerPage() {
  const [events, setEvents] = useState([])

  const handleSetEvents = (newEvents) => {
    setEvents(newEvents)
  }

  useEffect(() => {
    console.log(events)
  }, [events])

  return (
    <>
      <div className="w-10/12">
        <FullCalendar events={events} setEvents={handleSetEvents} />
      </div>
      <button
        className="btn"
        onClick={() => document.getElementById('my_modal_4').showModal()}
      >
        Add Task
      </button>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box min-w-max">
          <Form events={events} setEvents={handleSetEvents} />
          <div className="modal-action justify-start">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <ModalMaker />
    </>
  )
}
