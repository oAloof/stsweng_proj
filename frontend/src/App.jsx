import React, { useState, useRef } from 'react'
import { DndContext } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import Form from './components/Form'
import FullCalendar from './components/FullCalendar'
import ModalMaker from './components/ModalMaker'

export default function App() {
  const events = [{ title: 'Meeting', start: new Date() }]

  return (
    <>
      <div className="w-10/12">
        <FullCalendar />
      </div>
      <button
        className="btn"
        onClick={() => document.getElementById('my_modal_4').showModal()}
      >
        open modal
      </button>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box min-w-max">
          <Form />
          <div className="modal-action">
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

  function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }
}
