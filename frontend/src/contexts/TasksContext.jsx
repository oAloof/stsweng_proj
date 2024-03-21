import React, { createContext, useState, useEffect } from 'react'

import { GoogleGenerativeAI } from 'https://esm.run/@google/generative-ai'

const API_KEY = 'AIzaSyBsiHEIwIELH8KYTaO2aZ8ieObRUdyJxNE'

const genAI = new GoogleGenerativeAI(API_KEY)

export const TasksContext = createContext()

export const TasksProvider = ({ children }) => {
  const [isLoadingTasks, setIsLoadingTasks] = useState(true)
  const [tasks, setTasks] = useState([])
  const [subtasks, setSubtasks] = useState([])

  useEffect(() => {
    console.log(tasks)
  }, [tasks])
  /**
   * Fetches all tasks of a user from the server.
   *
   * @returns A promise that resolves to the tasks of the user. When the promise is
   *          parsed as a JSON object, it should contain a success flag, an error
   *          message if the operation failed, and the tasks of the user.
   */
  const fetchAllTasks = async () => {
    try {
      const response = await fetch('/api/tasks/getTasks', {
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
    try {
      const response = await fetch('/api/tasks/create', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
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
      isLoadingTasks(true)
    } catch (err) {
      console.error(err)
    }
  }

  // Create Task (no backend)
  const dummyCreateTask = async (task) => {
    setTasks([...tasks, task])
    const response = await generateSubTasks(task)
    console.log('generatingSubTasks')
    console.log(response)
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
  async function getSubtasks (task) {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
    let prompt = 'Generate short and simple subtasks for this task: "'
    prompt += task
    prompt += '"\nPut [Subtask] before each subtask'
    prompt += '\n\n Sample format:\n'
    prompt += '[Subtask] Subtask 1\n'
    prompt += '[Subtask] Subtask 2\n'

    const result = await model.generateContent(prompt)
    const response = await result.response
    const subtasks = response.text()
    return subtasks
  }

  const generateSubTasks = async (task) => {
    try {
      const subtasksString = await getSubtasks(task.title) // subtasks

      const subtasksArray = subtasksString.split('[Subtask]').filter(task => task.trim() !== '') // split by [Subtask], remvoe empty strinsg and store into an array

      setSubtasks(subtasksArray)
      setIsLoadingTasks(false)

      console.log(subtasksArray)
    } catch (err) {
      console.error(err)
      setIsLoadingTasks(false)
    }
  }

  useEffect(() => {
    fetchAllTasks()
  }, [isLoadingTasks])

  // when using context remember to pass in the stupid state or functions you're gonna use
  const contextValue = {
    isLoadingTasks,
    createTask,
    dummyCreateTask,
    dummyDeleteTask,
    dummyUpdateTask,
    tasks,
    subtasks
  }

  return (
    <TasksContext.Provider value={contextValue}>
      {children}
    </TasksContext.Provider>
  )
}
