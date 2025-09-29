import React, { createContext, useContext, useState, useEffect } from 'react'
import { authService } from '../services/auth'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('authToken')
        if (token) {
          const userData = await authService.getCurrentUser()
          setUser(userData)
        }
      } catch (error) {
        console.error('Auth initialization failed:', error)
        localStorage.removeItem('authToken')
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials)
      const { token, user } = response.data
      
      localStorage.setItem('authToken', token)
      setUser(user)
      
      return { success: true, user }
    } catch (error) {
      console.error('Login failed:', error)
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('authToken')
    setUser(null)
  }

  const updateUser = (userData) => {
    setUser(prevUser => ({ ...prevUser, ...userData }))
  }

  const value = {
    user,
    loading,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isStudent: user?.role === 'student',
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}