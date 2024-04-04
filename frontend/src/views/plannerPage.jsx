import React, { useState, useEffect, useContext } from 'react'
import FullCalendar from '../components/FullCalendar'
import Form from '../components/Form'
import NavBar from '../components/NavBar'
import PlannerSidebar from '../components/PlannerSidebar'
import { useNavigate } from 'react-router-dom'

import { AuthenticationContext } from '../contexts/AuthenticationContext'

export default function PlannerPage() {
  const navigate = useNavigate()
  const { isAuthenticated, isLoadingAuth, user } = useContext(
    AuthenticationContext
  )
  const [selectedEventData, setSelectedEventData] = useState(null)
  const [method, setMethod] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const [editable, setEditable] = useState(true)

  useEffect(() => {
    if (editable && selectedEventData) {
      document.getElementById('my_modal_4').showModal()
    }
  }, [editable, selectedEventData])

  const handleSetEditable = (e) => {
    setEditable(e)
  }

  const handleEventClick = (data) => {
    setSelectedEventData(data)
    console.log(editable)
  }

  const handleMethod = (method) => {
    setMethod(method)
  }

  const closeModal = () => {
    document.getElementById('my_modal_4').close()
    setSelectedEventData(null) // Reset for next use
  }

  if (isLoadingAuth) {
    return <div>Loading...</div>
  }

  return (
    <>
      <NavBar />
      <div>
        <div className="flex p-10 space-x-5">
          <PlannerSidebar setEventEdit={handleSetEditable} />
          <div className="w-10/12 flex-col">
            <FullCalendar
              onEventClick={handleEventClick}
              method={method}
              edit={editable}
            />
          </div>
        </div>
        <dialog id="my_modal_4" className="modal">
          <div className="modal-box min-w-max">
            <Form
              eventData={selectedEventData}
              method={handleMethod}
              editable={editable} // Pass editable as prop
            />
            <div className="modal-action justify-start">
              <form method="dialog">
                <button className="btn" onClick={closeModal}>
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </>
  )
}
