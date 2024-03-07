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

  useEffect(() => {
    checkAuthentication()
  }, [isAuthenticated])

  const contextValue = {
    isAuthenticated,
    user,
    isLoadingAuth,
    checkAuthentication
  }

  return (
    <AuthenticationContext.Provider value={contextValue}>
      {children}
    </AuthenticationContext.Provider>
  )
}