import React from 'react'

const Loading = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }

  return (
    <div className={`center-flex ${className}`}>
      <div className={`loading-spinner ${sizeClasses[size]} border-4`}></div>
    </div>
  )
}

export const PageLoading = () => (
  <div className="min-h-screen center-flex">
    <div className="text-center">
      <Loading size="lg" className="mb-4" />
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
)

export const Skeleton = ({ className = '', count = 1 }) => {
  if (count > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={`skeleton ${className}`}></div>
        ))}
      </div>
    )
  }

  return <div className={`skeleton ${className}`}></div>
}

export default Loading