import React, { createContext, useState, useEffect, useContext } from 'react'
import { AuthenticationContext } from './AuthenticationContext'

export const TasksContext = createContext()

export const TasksProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_URL
  const [isLoadingTasks, setIsLoadingTasks] = useState(true)
  const [tasks, setTasks] = useState([])
  const [ongoingTasks, setOngoingTasks] = useState([])
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
      const response = await fetch(`${apiUrl}/api/tasks/getTasks`, {
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
      getAllOngoingTasks(data.result)
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
      const response = await fetch(`${apiUrl}/api/tasks/create`, {
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

  /**
   * Updates a task. This will also set the isLoadingTasks state to true to trigger a
   * re-fetch of the tasks. If the task is successfully updated, the task will be
   * updated in the tasks state. If the task is not successfully updated, an error
   * message will be logged to the console.
   *
   * @param {Object} task - The task object to be updated.
   * @returns {Promise<void>} - A promise that resolves when the task is successfully updated.
   */
  const updateTask = async (task) => {
    const jwtToken = localStorage.getItem('token')
    try {
      const response = await fetch(`${apiUrl}/api/tasks/update`, {
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

  /**
   * Deletes a task from the server. This will also set the isLoadingTasks state to true
   * to trigger a re-fetch of the tasks. If the task is successfully deleted, the task
   * will be removed from the tasks state. If the task is not successfully deleted, an
   * error message will be logged to the console.
   *
   * @param {Object} task - The task object to be deleted.
   * @returns {Promise<void>} - A promise that resolves when the task is successfully deleted.
   */
  const deleteTask = async (task) => {
    const jwtToken = localStorage.getItem('token')
    try {
      const response = await fetch(`${apiUrl}/api/tasks/delete`, {
        method: 'DELETE',
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

  const getAllOngoingTasks = (tasks) => {
    function filterPlanning(task) {
      return task.status == 'PLANNING'
    }
    function filterComplete(task) {
      return task.status == 'COMPLETED'
    }

    var filteredPlanning = tasks.filter(filterPlanning)
    var filteredComplete = tasks.filter(filterComplete)

    var res = tasks.filter(item => !filteredPlanning.includes(item))
    var final = res.filter(item => !filteredComplete.includes(item))
    
    setOngoingTasks(final)
  }

  useEffect(() => {
    fetchAllTasks()
  }, [isAuthenticated, isLoadingTasks])

  // when using context remember to pass in the stupid state or functions you're gonna use
  const contextValue = {
    isLoadingTasks,
    createTask,
    updateTask,
    deleteTask,
    tasks,
    setTasks,
    ongoingTasks,
    getAllOngoingTasks
  }

  return (
    <TasksContext.Provider value={contextValue}>
      {children}
    </TasksContext.Provider>
  )
}
