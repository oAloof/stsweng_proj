import React, { useEffect, useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import Form from './Form'

export default function CalendarComponent ({ events }) {
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

      calendarApi.on('eventClick', (info) => {
        console.log('Event clicked:', info.event)
        document.getElementById('my_modal_3').showModal()
        // Do whatever you want when an event is clicked
      })
    }

    initFullCalendar()
  }, [])

  return (
    <div>
      <div ref={externalEventsRef} id='external-events'>
        <p>
          <strong>Draggable Events</strong>
        </p>
      </div>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        editable
        droppable
        events={events} // Pass the events prop to FullCalendar
      />

      <dialog id='my_modal_3' className='modal'>
        <div className='modal-box min-w-max'>
          <Form />
          <div className='modal-action'>
            <form method='dialog'>
              {/* if there is a button in form, it will close the modal */}
              <button className='btn'>Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  )
}
