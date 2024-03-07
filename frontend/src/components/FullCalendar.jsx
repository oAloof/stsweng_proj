import React, { useEffect, useRef, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import Form from './Form'
import './FullCalendar.css'

export default function CalendarComponent({ events, setEvents }) {
  const calendarRef = useRef(null)
  const externalEventsRef = useRef(null)
  const [selectedEvent, setSelectedEvent] = useState(null)

  useEffect(() => {
    const initFullCalendar = () => {
      const calendarApi = calendarRef.current.getApi()

      new Draggable(externalEventsRef.current, {
        itemSelector: '.fc-event',
        eventData: (event) => ({
          title: event.innerText.trim()
        })
      })

      calendarApi.on('drop', (info) => {
        info.draggedEl.parentNode.removeChild(info.draggedEl)
      })

      calendarApi.on('eventClick', (info) => {
        setSelectedEvent(events[0]) // Set the selected event
        document.getElementById('my_modal_3').showModal()
      })
    }

    initFullCalendar()
  }, [events]) // Run effect when events change

  return (
    <div>
      <div ref={externalEventsRef} id="external-events">
        <p>
          <strong>Draggable Events</strong>
        </p>
      </div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable
        droppable
        events={events} // Pass the events prop to FullCalendar
      />
      {/* <div>{selectedEvent.title}</div> */}
      <Form event={selectedEvent} setEvents={setEvents} />
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      {/* Use key prop to force re-render */}
    </div>
  )
}
