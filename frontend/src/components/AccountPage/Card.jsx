import React, { useEffect, useContext } from 'react'
import { EditContext } from '../../contexts/EditContext'
import Icon from './Icon'
import { AuthenticationContext } from '../../contexts/AuthenticationContext'
import { TasksContext } from '../../contexts/TasksContext'

export default function Card ({}) {
  const { editTask, accountView, noTable } = useContext(EditContext)
  const { user, isLoadingAuth } = useContext(AuthenticationContext)
  const { completedTasks, completedLate, completedEarly } = useContext(TasksContext)

  // Calculate the level of the user based on the experience points
  const level = Math.floor(user.experience / 100)
  // Calculate the progress of the user to the next level
  const progress = (user.experience % 100) / 100

  const Edit = () => {
    noTable()
    editTask()
    accountView()
  }

  if (isLoadingAuth) {
    return <div>Loading...</div>
  }

  return (
    <div className='shadow flex flex-col items-center space-y-5 p-5 max-w-[400px] rounded-xl'>
      <div className=''>
        <Icon iconLInk='link' userName={user.username} />
      </div>
      <p class='font-medium	'>{user.username}</p>
      <div className='min-w-[225px]'>
        <div className='flex justify-between'>
          <p class='text-sm'>Tasks Finished on Time:  </p>
          <p class='text-sm font-semibold	'>{completedEarly.length}</p>
        </div>
        <div className='flex justify-between'>
          <p class='text-sm'>Tasks Finished Late:   </p>
          <p class='text-sm font-semibold	'>{completedLate.length}</p>
        </div>
        <div className='flex justify-between'>
          <p class='text-sm'>Total Finished Tasks:  </p>
          <p class='text-sm font-semibold	'>{completedTasks.length}</p>
        </div>
      </div>
      <div>
        <div className='flex justify-between'>
          <p>Level {level}</p>
          <p>{progress}/100</p>
        </div>
        <progress className='progress progress-primary w-56' value={progress} max='100' />
      </div>
      <button onClick={Edit} className='btn'>Edit Account Details</button>
    </div>
  )
}
