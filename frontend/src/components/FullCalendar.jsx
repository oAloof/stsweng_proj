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
  const { tasks, isLoadingTasks, updateTask } = useContext(TasksContext)
  const [calendarEvents, setCalendarEvents] = useState([])
  const tasksRef = useRef(tasks)

  useEffect(() => {
    tasksRef.current = tasks // Update the ref whenever tasks change
  }, [tasks])

  useEffect(() => {
    const transformTasksToEvents = tasks.map((task) => ({
      id: task._id,
      title: task.taskName,
      start: task.deadline,
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
          const currentTasks = tasksRef.current
          // Look for the task in the tasks array
          const task = currentTasks.find((task) => task._id.toString() === event.id.toString())
          // Update the task with the new start and deadline
          task.deadline = event.start
          // Update the task in the backend
          updateTask(task)
        })
      }
    }

    initFullCalendar()
  }, [isLoadingTasks])

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
