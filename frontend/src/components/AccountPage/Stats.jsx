import React, { useContext } from 'react'
import { TasksContext } from '../../contexts/TasksContext'
import { AuthenticationContext } from '../../contexts/AuthenticationContext'

export default function Stats () {
  const { ongoingTasks, tasks } = useContext(TasksContext)
  const { user } = useContext(AuthenticationContext)

  // Get the overdue tasks
  const overdueTasks = ongoingTasks.filter((task) => {
    const dueDate = new Date(task.dueDate)
    const currentDate = new Date()
    return dueDate < currentDate
  })

  // Get percentage of tasks done based on the total tasks
  const tasksDone = tasks.filter((task) => task.completed)
  const tasksDonePercentage = (tasksDone.length / tasks.length) * 100

  return (
    <div className='stats flex shadow min-w-[800px] max-w-[1200px]'>

      <div className='stat '>
        <div className='stat-figure text-primary'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='inline-block w-8 h-8 stroke-current'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' /></svg>
        </div>
        <div className='stat-title'>Incoming Tasks</div>
        <div className='stat-value text-primary'>{ongoingTasks.length}</div>
        <div className='stat-desc'>Finish it early to get extra exp</div>
      </div>

      <div className='stat '>
        <div className='stat-figure text-secondary'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' className='inline-block w-8 h-8 stroke-current'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M13 10V3L4 14h7v7l9-11h-7z' /></svg>
        </div>
        <div className='stat-title'>Current Streak</div>
        <div className='stat-value text-secondary'>{user.streak} {user.streak > 0 ? 'Days' : 'Day'}</div>
        <div className='stat-desc'>You got this!</div>
      </div>

      <div className='stat'>
        <div className='stat-figure text-secondary'>
          <div className='stat-figure text-secondary'>
            <svg xmlns='http://www.w3.org/2000/svg' className='inline-block w-6 h-6 stroke-accent' viewBox='0 0 24 24' fill='none' stroke='#000000' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'><polyline points='9 11 12 14 22 4' /><path d='M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11' /></svg>
          </div>
        </div>
        <div className='stat-value'>{tasksDonePercentage}%</div>
        <div className='stat-title'>Tasks done</div>
        <div className='stat-desc text-accent'>{overdueTasks.length} tasks overdue</div>
      </div>

    </div>
  )
}
