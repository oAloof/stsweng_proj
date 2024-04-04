import React, { useState, useContext } from 'react'
import { TasksContext } from '../../contexts/TasksContext'

export default function TaskStats ({}) {
const {dueToday, dueWeek, overdue} = useContext(TasksContext);

  return (
    <div className='shadow flex justify-around  p-5 max-h-[200px] rounded-xl	'>
      <div className="">
        <p class="stat-title font-medium">Overdue Tasks: </p>
        <div className='stat-value text-accent '>{overdue.length}</div>
      </div>
      <div className="">
        <p class="stat-title font-medium">Tasks for today: </p>
        <div className='stat-value text-primary '>{dueToday.length}</div>
      </div>
      <div className="">
        <p class="stat-title font-medium">Tasks this week: </p>
        <div className='stat-value text-secondary '>{dueWeek.length}</div>
      </div>
    </div>
  )
}