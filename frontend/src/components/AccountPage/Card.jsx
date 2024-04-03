import React, { useState, useContext } from 'react'
import { EditContext } from '../../contexts/EditContext'
import Icon from './Icon'

export default function Card ({}) {
  const { editTask, accountView, noTable } = useContext(EditContext)

  const Edit = () => {
    noTable()
    editTask()
    accountView()
  }

  return (
    <div className='shadow flex flex-col items-center space-y-5 p-5 max-w-[400px] rounded-xl	'>
      <div className=''>
        <Icon iconLInk='link' userName='UserNumber1' />
      </div>
      <div>
        <p >Username</p>
      </div>
      <div>
        <div className='flex justify-between'>
          <p>Level 4</p>
          <p>80/100</p>
        </div>
        <progress className='progress progress-primary w-56' value='80' max='100' />
      </div>
      <button onClick={Edit} className='btn'>Edit Account Details</button>
    </div>
  )
}
