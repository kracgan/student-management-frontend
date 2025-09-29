import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react'
import Button from '../ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card'
import { cn } from '../../utils/helpers'

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const result = await login(data)
      if (result.success) {
        navigate('/')
      }
    } catch (error) {
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Student Management System
          </h1>
          <p className="text-gray-600">
            Sign in to your account
          </p>
        </div>

        {/* Login Card */}
        <Card className="backdrop-blur-sm bg-white/90">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Username Field */}
              <div>
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('username')}
                    type="text"
                    id="username"
                    className={cn(
                      'form-input pl-10',
                      errors.username && 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    )}
                    placeholder="Enter your username"
                    disabled={isLoading}
                  />
                </div>
                {errors.username && (
                  <p className="form-error">{errors.username.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register('password')}
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className={cn(
                      'form-input pl-10 pr-10',
                      errors.password && 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    )}
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="form-error">{errors.password.message}</p>
                )}
              </div>

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
                <a
                  href="#"
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full"
                loading={isLoading}
                disabled={isLoading}
              >
                Sign In
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-sm font-medium text-blue-900 mb-2">Demo Credentials</h3>
              <div className="space-y-1 text-sm text-blue-800">
                <p><strong>Admin:</strong> admin / admin123</p>
                <p><strong>Student:</strong> student / student123</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            © 2025 Student Management System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login