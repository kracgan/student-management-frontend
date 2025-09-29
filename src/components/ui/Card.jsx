import React from 'react'
import { cn } from '../../utils/helpers'

const Card = React.forwardRef(({ children, className, hover = true, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'card bg-white rounded-xl border border-gray-100',
        hover && 'hover:shadow-medium transition-all duration-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = 'Card'

const CardHeader = React.forwardRef(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('px-6 py-4 border-b border-gray-100', className)}
      {...props}
    >
      {children}
    </div>
  )
})

CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef(({ children, className, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn('text-lg font-semibold text-gray-900', className)}
      {...props}
    >
      {children}
    </h3>
  )
})

CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef(({ children, className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn('text-sm text-gray-600 mt-1', className)}
      {...props}
    >
      {children}
    </p>
  )
})

CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('px-6 py-4', className)}
      {...props}
    >
      {children}
    </div>
  )
})

CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('px-6 py-4 border-t border-gray-100 bg-gray-50', className)}
      {...props}
    >
      {children}
    </div>
  )
})

CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }