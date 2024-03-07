import React, { useEffect, useRef, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
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
        setSelectedEvent(info.event)
        document.getElementById('my_modal_3').showModal()
      })
    }

    initFullCalendar()
  }, [events])

  return (
    <div>
      <div ref={externalEventsRef} id="external-events">
        <p>
          <strong>Draggable Events</strong>
        </p>
      </div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,listWeek' // user can switch between the two
        }}
        editable
        droppable
        events={events}
      />
      <Form event={selectedEvent} setEvents={setEvents} />
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}
