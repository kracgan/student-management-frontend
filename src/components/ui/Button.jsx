import React from 'react'
import { cn } from '../../utils/helpers'

const Button = React.forwardRef(
  ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    disabled = false, 
    loading = false,
    leftIcon,
    rightIcon,
    className,
    ...props 
  }, ref) => {
    const baseClasses = 'btn inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg'
    
    const variantClasses = {
      primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-soft',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
      success: 'bg-success text-white hover:bg-green-600 focus:ring-green-500',
      warning: 'bg-warning text-white hover:bg-yellow-600 focus:ring-yellow-500',
      error: 'bg-error text-white hover:bg-red-600 focus:ring-red-500',
      ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500',
      outline: 'bg-transparent border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white focus:ring-primary-500',
    }
    
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
      xl: 'px-8 py-4 text-xl',
    }

    const classes = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      loading && 'cursor-wait',
      className
    )

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <div className="loading-spinner w-4 h-4 border-2 border-current border-t-transparent mr-2"></div>
            {children}
          </>
        ) : (
          <>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button