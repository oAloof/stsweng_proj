import React, { useState, useContext } from 'react'

export default function Bar ({}) {

  return (
    <ul className='mt-5 menu menu-horizontal bg-base-200 rounded-box flex space-x-3'>
      <li>
        <button className='btn shadow' >
        <svg xmlns="http://www.w3.org/2000/svg"  className='h-5 w-5 stroke-primary'  viewBox="0 0 24 24" fill="none"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path><polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon></svg>          Plan Tasks
        </button>
      </li>
      <li>
        <button className='btn shadow'>
          <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 stroke-accent' viewBox='0 0 24 24' fill='none' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z' /><line x1='12' y1='9' x2='12' y2='13' /><line x1='12' y1='17' x2='12.01' y2='17' /></svg>
          Overdue Tasks
        </button>
      </li>
      <li>
        <button className='btn shadow' >
          <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 stroke-primary' viewBox='0 0 24 24' fill='none' stroke='#000000' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><polyline points='9 11 12 14 22 4' /><path d='M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11' /></svg>
          Finished Tasks
        </button>
      </li>
    </ul>
  )
}