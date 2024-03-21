import React, { useEffect, useRef, useContext } from 'react'
import { TasksContext } from '../contexts/TasksContext'

export default function DataTable () {
  const { tasks, subtasks } = useContext(TasksContext)
  return (
    <div className='overflow-x-auto'>
      <table className='table'>
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type='checkbox' className='checkbox' />
              </label>
            </th>
            <th>Task Name</th>
            <th>Due Date</th>
            <th>Category</th>
            <th>Sub Label</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {tasks && tasks.map((task) => {
            return (
              <tr class='bg-base-200'>
                <th>
                  <label>
                    <input checked type='checkbox' className='checkbox' />
                  </label>
                </th>
                <td>
                  <div className='flex items-center gap-3'>
                    <div>
                      <div className='font-bold'>{task.title}</div>
                      <div className='text-sm opacity-50'>Main Task</div>
                    </div>
                  </div>
                </td>
                <td>{task.end.toDateString()}</td>
                <td>{task.category[0]}</td>
                <td>
                  {task.subLabel && task.subLabel.map((label) => {
                    return (
                      <div class='text-sm opacity-50'>{label}</div>
                    )
                  })}
                </td>
                <th>
                  <button className='btn btn-ghost btn-xs'>details</button>
                </th>
              </tr>
            )
          })}
          {/* row 2 */}
          {subtasks && subtasks.map((task) => {
            return (
              <tr className='pl-30'>
                <th>
                  <label>
                    <input type='checkbox' className='checkbox' />
                  </label>
                </th>
                <td>
                  <div className='flex items-center gap-3'>
                    <div>
                      <div className='font-bold'>{task}</div>
                      <div className='text-sm opacity-50'>Sub Task</div>
                    </div>
                  </div>
                </td>
                <td>{tasks[0].end.toDateString()}</td>
                <td>{tasks[0].category[0]}</td>
                <td>
                  {tasks[0].subLabel && tasks[0].subLabel.map((label) => {
                    return (
                      <div class='text-sm opacity-50'>{label}</div>
                    )
                  })}
                </td>
                <th>
                  <button className='btn btn-ghost btn-xs'>details</button>
                </th>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
