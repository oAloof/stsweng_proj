import React, { useState, useContext } from 'react'
import { EditContext } from '../../contexts/EditContext'

export default function TaskStats ({}) {
const [overdue, setOverdue] = useState(true)

  return (
    <div className='shadow flex justify-around  p-5 max-h-[200px] rounded-xl	'>
      {overdue &&
        <div className="">
          <p class="stat-title font-medium">Overdue Tasks: </p>
          <div className='stat-value text-accent '>15</div>
        </div>
      }
      <div className="">
        <p class="stat-title font-medium">Tasks for today: </p>
        <div className='stat-value text-primary '>15</div>
      </div>
      <div className="">
        <p class="stat-title font-medium">Tasks this week: </p>
        <div className='stat-value text-secondary '>15</div>
      </div>
    </div>
  )
}