import React, { useEffect, useRef, useContext, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import './FullCalendar.css'
import { TasksContext } from '../contexts/TasksContext'

export default function CalendarComponent() {
  const calendarRef = useRef(null)
  const externalEventsRef = useRef(null)
  const { tasks } = useContext(TasksContext)
  const [calendarEvents, setCalendarEvents] = useState([])

  useEffect(() => {
    const handleEvents = () => {
      setCalendarEvents(tasks)
    }
    handleEvents() // Initial setup

    console.log(tasks + 'inside calendar?')
  }, [tasks])

  useEffect(() => {
    const initFullCalendar = () => {
      const calendarApi = calendarRef.current.getApi()

      new Draggable(externalEventsRef.current, {
        itemSelector: '.fc-event',
        eventData: (eventEl) => ({
          title: eventEl.innerText.trim()
        })
      })

      calendarApi.on('drop', (info) => {
        info.draggedEl.parentNode.removeChild(info.draggedEl)
      })

      calendarApi.on('eventClick', (info) => {
        // Here you can handle event click actions
      })
    }

    initFullCalendar()
  }, [])

  return (
    <>
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
          events={() => calendarEvents} // Use processed events
        />
      </div>
    </>
  )
}
