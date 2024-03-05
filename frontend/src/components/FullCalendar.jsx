import React, { useEffect, useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'

export default function CalendarComponent({ events }) {
  const calendarRef = useRef(null)
  const externalEventsRef = useRef(null)

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
    }

    initFullCalendar()
  }, [])

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
    </div>
  )
}
