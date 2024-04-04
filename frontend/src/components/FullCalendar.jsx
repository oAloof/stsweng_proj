import React, { useEffect, useRef, useContext, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import './FullCalendar.css'
import { TasksContext } from '../contexts/TasksContext'

export default function CalendarComponent({ onEventClick, method, edit }) {
  const calendarRef = useRef(null)
  const externalEventsRef = useRef(null)
  const { tasks, isLoadingTasks, updateTask, deleteTask } =
    useContext(TasksContext)
  const [calendarEvents, setCalendarEvents] = useState([])
  const tasksRef = useRef(tasks)

  useEffect(() => {
    tasksRef.current = tasks // Update the ref whenever tasks change
  }, [tasks, edit])

  useEffect(() => {
    const transformTasksToEvents = tasks.map((task) => ({
      id: task._id,
      title: task.taskName,
      start: task.deadline,
      end: task.deadline,
      extendedProps: {
        category: task.category,
        label: task.label,
        description: task.description,
        difficulty: task.difficulty
      },
      color: 'red' // Color should change depending if its final or not
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
        console.log('insideinitfullcalendar' + edit)
        if (edit) {
          calendarApi.on('eventClick', ({ event }) => {
            // Open Modal
            if (method === 'delete') {
              const currentTasks = tasksRef.current
              const task = currentTasks.find(
                (task) => task._id.toString() === event.id.toString()
              )
              console.log(task)
              deleteTask(task)
            }
            const eventData = {
              _id: event.id,
              title: event.title,
              category: [event.extendedProps.category],
              subLabel: event.extendedProps.label,
              description: event.extendedProps.description,
              difficulty: event.extendedProps.difficulty,
              end: new Date(event.start).toISOString(),
              start: new Date(event.start).toISOString()
            }
            onEventClick(eventData)
          })

          calendarApi.on('eventDrop', ({ event }) => {
            // Update tasks state (used in the backend)
            const currentTasks = tasksRef.current
            // Look for the task in the tasks array
            const task = currentTasks.find(
              (task) => task._id.toString() === event.id.toString()
            )
            // Update the task with the new start and deadline
            task.deadline = event.start
            // Update the task in the backend
            console.log(task)
            updateTask(task)
          })
        }
      }
    }

    initFullCalendar()
  }, [isLoadingTasks, method, edit])

  return (
    <>
      <div>
        <div ref={externalEventsRef} id="external-events"></div>
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, listPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            right: 'dayGridMonth,listWeek' // user can switch between the two
          }}
          editable={edit}
          droppable
          events={calendarEvents}
        />
      </div>
    </>
  )
}
