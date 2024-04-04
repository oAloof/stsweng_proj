import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthenticationContext = createContext()

export const AuthenticationProvider = ({ children }) => {
  const navigete = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({ username: '', firstName: '', lastName: ''})
  const [isLoadingAuth, setIsLoadingAuth] = useState(true)

  const checkAuthentication = async () => {
    const jwtToken = localStorage.getItem('token')
    try {
      const response = await fetch('http://localhost:4000/api/users/check-auth', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`
        }
      })
      if (!response.ok) {
        throw new Error('User not authenticated.')
      }

      const data = await response.json()
      if (!data.success) {
        console.log('User not authenticated.')
        return
      }
      if (!data.result) {
        console.log('User not authenticated.')
        return
      }
      // Set the user data in the context except for the password
      setUser({
        username: data.result.username,
        firstName: data.result.firstName,
        lastName: data.result.lastName
      })
      setIsAuthenticated(true)
      setIsLoadingAuth(false)
    } catch (error) {
      // localStorage.removeItem('token')
      setIsLoadingAuth(false)
      setIsAuthenticated(false)
    }
  }

  const register = async (username, password, firstName, lastName, email) => {
    try {
      const response = await fetch('http://localhost:4000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, firstName, lastName, email })
      })
      if (!response.ok) {
        throw new Error('Failed to register user.')
      }

      const data = await response.json()
      if (!data.success) {
        throw new Error('Failed to register user.')
      }
      return data
    } catch (error) {
      console.error(error)
      return { success: false, error: 'Failed to register user.', result: null }
    }
  }

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
      if (!response.ok) {
        throw new Error('Failed to login user.')
      }

      const data = await response.json()
      if (!data.success) {
        throw new Error('Failed to login user.')
      }
      localStorage.setItem('token', data.jwtToken)
      setIsAuthenticated(true)
    } catch (error) {
      console.error(error)
      return { success: false, error: 'Invalid username or password.', result: null }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser({ username: '', firstName: '', lastName: '' })
    setIsAuthenticated(false)
    navigete('/')
  }

  useEffect(() => {
    checkAuthentication()
  }, [])

  const contextValue = {
    isAuthenticated,
    user,
    isLoadingAuth,
    checkAuthentication,
    register,
    login,
    logout
  }

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {children}
    </AuthenticationContext.Provider>
  )
}
