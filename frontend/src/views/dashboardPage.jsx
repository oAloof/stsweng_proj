import React, { useContext, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import NavBar from '../components/NavBar'
import TaskBar from '../components/Dashboard/TaskBar'
import TaskStats from '../components/Dashboard/TaskStats'
import Table from '../components/Dashboard/Table'

export default function dashboardPage () {
  return (
    <div>
      <NavBar />
      <div className=' mx-auto min-h-screen flex justify-center space-x-5 p-20'>
        <div className='w-1/4'>
          <TaskBar />
        </div>
        <div className='w-3/4 flex flex-col space-y-5'>
          <TaskStats />
          <Table />
        </div>
      </div>
    </div>
  )
}
