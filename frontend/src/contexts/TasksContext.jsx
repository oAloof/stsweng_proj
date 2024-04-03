import React, { createContext, useState, useEffect, useContext } from 'react'
import { AuthenticationContext } from './AuthenticationContext'

export const TasksContext = createContext()

export const TasksProvider = ({ children }) => {
  const [isLoadingTasks, setIsLoadingTasks] = useState(true)
  const [tasks, setTasks] = useState([])
  const { isAuthenticated } = useContext(AuthenticationContext)

  /**
   * Fetches all tasks of a user from the server.
   *
   * @returns A promise that resolves to the tasks of the user. When the promise is
   *          parsed as a JSON object, it should contain a success flag, an error
   *          message if the operation failed, and the tasks of the user.
   */
  const fetchAllTasks = async () => {
    const jwtToken = localStorage.getItem('token')
    try {
      const response = await fetch('http://localhost:4000/api/tasks/getTasks', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`
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

  /**
   * Creates a new task by sending a POST request to the server. This will also set
   * the isLoadingTasks state to true to trigger a re-fetch of the tasks.
   *
   * @param {Object} task       The task object to be created.
   * @returns {Promise<void>}   A promise that resolves when the task is created
   *                            successfully.
   * @throws {Error}            If there is an HTTP error or if the response data
   *                            indicates failure.
   */
  const createTask = async (task) => {
    const jwtToken = localStorage.getItem('token')
    console.log('Inside createTask...', task)
    try {
      const response = await fetch('http://localhost:4000/api/tasks/create', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`
        },
        body: JSON.stringify(task)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      if (!data.success) {
        console.error(data.error)
        return
      }
      setIsLoadingTasks(true)
    } catch (err) {
      console.error(err)
    }
  }

  const updateTask = async (task) => {
    const jwtToken = localStorage.getItem('token')
    try {
      const response = await fetch('http://localhost:4000/api/tasks/update', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`
        },
        body: JSON.stringify(task)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      if (!data.success) {
        console.error(data.error)
        return
      }
      setIsLoadingTasks(true)
    } catch (err) {
      console.error(err)
    }
  }

  // Delete Task (no backend)
  const dummyDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }
  // Update Task (no backend)
  const dummyUpdateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    )
  }

  useEffect(() => {
    fetchAllTasks()
  }, [isAuthenticated, isLoadingTasks])

  // when using context remember to pass in the stupid state or functions you're gonna use
  const contextValue = {
    isLoadingTasks,
    createTask,
    dummyDeleteTask,
    dummyUpdateTask,
    tasks,
    setTasks,
    createTask,
    updateTask
  }

  return (
    <TasksContext.Provider value={contextValue}>
      {children}
    </TasksContext.Provider>
  )
}
