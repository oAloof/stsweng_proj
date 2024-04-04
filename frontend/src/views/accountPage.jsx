import React, { useContext, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Card from '../components/AccountPage/Card'
import Stats from '../components/AccountPage/Stats'
import View from '../components/AccountPage/View'
import NavBar from '../components/NavBar'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { AuthenticationContext } from '../contexts/AuthenticationContext'

export default function AccountPage () {
  const navigate = useNavigate()
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
      <div className=' mx-auto min-h-screen flex justify-center space-x-5 p-20 max-w-[2000px]'>
        <div className='w-1/4'>
          <Card />
        </div>
        <div className='w-3/4 '>
          <Stats user='user' tasks='Tasks' />
          <View />
        </div>
      </div>
    </div>
  )
}
