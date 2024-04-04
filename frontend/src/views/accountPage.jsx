import React, { useContext, useEffect } from 'react'
import Card from '../components/AccountPage/Card'
import Stats from '../components/AccountPage/Stats'
import View from '../components/AccountPage/View'
import NavBar from '../components/NavBar'
import {  useNavigate } from 'react-router-dom'
import { AuthenticationContext } from '../contexts/AuthenticationContext'

export default function AccountPage () {
  const navigate = useNavigate()
  const { isAuthenticated, isLoadingAuth } = useContext(AuthenticationContext)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  if (isLoadingAuth) {
    return <div>Loading...</div>
  }

  return (
    <div>
    <NavBar/>
      <div className=' mx-auto min-h-screen flex justify-center space-x-5 p-20 max-w-[2000px]'>
        <div className='w-1/4'>
          <Card />
        </div>
        <div className='w-3/4 '>
          <Stats />
          <View />
        </div>
      </div>
    </div>
  )
}
