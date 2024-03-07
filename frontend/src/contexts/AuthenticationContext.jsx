import { set } from 'mongoose'
import React, { createContext, useState, useEffect } from 'react'

export const AuthenticationContext = createContext()

export const AuthenticationProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({ username: '', firstName: '', lastName: '' })
  const [isLoadingAuth, setIsLoadingAuth] = useState(true)

  const checkAuthentication = async () => {
    try {
      const response = await fetch('/api/users/check-auth', {
        method: 'GET',
        credentials: 'include'
      })
      if (!response.ok) {
        throw new Error('User not authenticated.')
      }

      const data = await response.json()
      if (!data.success) {
        throw new Error('User not authenticated.')
      }
      if (!data.result) {
        throw new Error('User not authenticated.')
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
      console.error(error)
      setIsLoadingAuth(false)
    }
  }

  const register = async (username, password, firstName, lastName) => {
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, firstName, lastName })
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
      const response = await fetch('/api/users/login', {
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
      setIsAuthenticated(true)
    } catch (error) {
      console.error(error)
      return { success: false, error: 'Invalid username or password.', result: null }
    }
  }

  useEffect(() => {
    checkAuthentication()
  }, [isAuthenticated])

  const contextValue = {
    isAuthenticated,
    user,
    isLoadingAuth,
    checkAuthentication,
    register,
    login
  }

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {children}
    </AuthenticationContext.Provider>
  )
}