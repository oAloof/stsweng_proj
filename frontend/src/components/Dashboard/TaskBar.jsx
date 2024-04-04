import React, { useState, useContext } from 'react'

export default function TaskBar ({}) {
const [overdue, setOverdue] = useState(true)

  return (
    <div className='shadow flex flex-col items-center space-y-5 p-5 max-w-[400px] rounded-xl	'>
      <p class="font-medium text-xl ">Task Statistics</p>
      <div className="divider"></div> 
      {overdue &&
        <div className="flex flex-col items-center space-y-5">
          <div className="radial-progress text-accent" style={{"--value":70}} role="progressbar">70%</div>
          <p class="font-medium	">Overdue Tasks Finished</p>
        </div>
      }
      <div className="radial-progress text-primary" style={{"--value":70}} role="progressbar">70%</div>
      <p class="font-medium	">Today's Tasks Finished</p>
      <div className="radial-progress text-secondary" style={{"--value":70}} role="progressbar">70%</div>
      <p class="font-medium	">This Weeks's Tasks Finished</p>
    </div>
  )
}
