import React, { useEffect, useRef, useContext, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import './FullCalendar.css'
import { TasksContext } from '../contexts/TasksContext'

export default function CalendarComponent () {
  const calendarRef = useRef(null)
  const externalEventsRef = useRef(null)
  const { tasks } = useContext(TasksContext)
  const [calendarEvents, setCalendarEvents] = useState([])

  useEffect(() => {
    const transformTasksToEvents = tasks.map((task) => ({
      id: task.id,
      title: task.taskName,
      start: task.start,
      end: task.deadline
    }))

    setCalendarEvents(transformTasksToEvents)

    const initFullCalendar = () => {
      const calendarApi = calendarRef.current.getApi()

      if (calendarApi) {
        new Draggable(externalEventsRef.current, {
          itemSelector: '.fc-event',
          eventData: (event) => ({
            title: event.innerText.trim()
            // taskID: (from the mongoDB)
          })
        })

        // taskName: data.title,
        // category: data.category[0],
        // label: data.subLabel,
        // description: data.description,
        // difficulty: data.difficulty,
        // deadline: data.end,
        // start: data.start
        calendarApi.on('eventClick', ({ event }) => {
          // Open Modal
          document.getElementById('my_modal_4').showModal()

          document.getElementById('Title').value = event.title

          document.getElementsByClassName('Category').value = event.category[0]

          console.log(info)
        })

        calendarApi.on('eventDrop', ({ event }) => {
          // Update tasks state (used in the backend)
          console.log(event.start)
        })
      }
    }

    initFullCalendar()
  }, [tasks])

  return (
    <>
      <div>
        <div ref={externalEventsRef} id='external-events'>
          <p>
            <strong>Draggable Events</strong>
          </p>
        </div>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
          initialView='dayGridMonth'
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,listWeek' // user can switch between the two
          }}
          editable
          droppable
          events={calendarEvents}
        />
      </div>
    </>
  )
}
