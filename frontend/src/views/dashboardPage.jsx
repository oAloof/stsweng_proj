import React, { useContext, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import NavBar from '../components/NavBar'
import TaskBar from '../components/Dashboard/TaskBar'
import TaskStats from '../components/Dashboard/TaskStats'
import Bar from '../components/Dashboard/Bar'
import { AuthenticationContext } from '../contexts/AuthenticationContext'

export default function dashboardPage () {
  // const { isAuthenticated, isLoadingAuth, login } = useContext(AuthenticationContext)

  // useEffect(() => {
  //   console.log('isAuthenticated:', isAuthenticated);
  //   if (isAuthenticated) {
  //     navigate('/planner')
  //   }
  // }, [isAuthenticated, navigate])

  // const onSubmit = async (data) => {
  //   await login(data.username, data.password)
  // }
  // const handleRegister = () => {
  //   navigate('/register')
  // }

  // if (isLoadingAuth) {
  //   return <div>Loading...</div>
  // }

  return (
    <div>
    <NavBar/>
      <div className=' mx-auto min-h-screen flex justify-center space-x-5 p-20'>
        <div className='w-1/4'>
          <TaskBar/>
        </div>
        <div className='w-3/4 '>
        <TaskStats/>
        {/* <Bar/> */}
        </div>
      </div>
    </div>
  )
}
