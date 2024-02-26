import React, { createContext, useState, useEffect } from 'react'

export const TasksContext = createContext()

export const TasksProvider = ({ children }) => {
  const [isLoadingTasks, setIsLoadingTasks] = useState(true)
  const [tasks, setTasks] = useState([])

  /**
   * Fetches all tasks of a user from the server.
   *
   * @returns A promise that resolves to the tasks of the user. When the promise is
   *          parsed as a JSON object, it should contain a success flag, an error
   *          message if the operation failed, and the tasks of the user.
   */
  const fetchAllTasks = async () => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        // Handle HTTP errors, e.g., 401 Unauthorized, 403 Forbidden
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      if (!data.success) {
        console.error(data.error)
        return
      }
      setTasks(data.result)
      setIsLoadingTasks(false)
    } catch (err) {
      console.error(err)
      setIsLoadingTasks(false)
    }
  }

  useEffect(() => {
    fetchAllTasks()
  }, [])

  const contextValue = {}

  return (
    <TasksContext.Provider value={contextValue}>
      {children}
    </TasksContext.Provider>
  )
}
