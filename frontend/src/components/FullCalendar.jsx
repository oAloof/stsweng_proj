import React, { useEffect, useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'

export default function CalendarComponent() {
  const calendarRef = useRef(null)
  const externalEventsRef = useRef(null)

  useEffect(() => {
    const initFullCalendar = () => {
      const calendarApi = calendarRef.current.getApi()

      new Draggable(externalEventsRef.current, {
        itemSelector: '.fc-event',
        eventData: function (eventEl) {
          return {
            title: eventEl.innerText
          }
        }
      })

      calendarApi.on('drop', function (info) {
        const checkbox = document.getElementById('drop-remove')
        if (checkbox.checked) {
          info.draggedEl.parentNode.removeChild(info.draggedEl)
        }
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
        <div className="fc-event">My Event 1</div>
        <div className="fc-event">My Event 2</div>
        <div className="fc-event">My Event 3</div>
        <div className="fc-event">My Event 4</div>
        <div className="fc-event">My Event 5</div>
        <p>
          <input type="checkbox" id="drop-remove" />
          <label htmlFor="drop-remove">remove after drop</label>
        </p>
      </div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        droppable={true}
      />
    </div>
  )
}
