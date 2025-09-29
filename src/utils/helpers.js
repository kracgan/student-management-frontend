import { clsx } from 'clsx'
import { format, formatDistanceToNow, parseISO } from 'date-fns'

// Classname utility
export { clsx }

// Date formatting utilities
export const formatDate = (date, formatString = 'MMM dd, yyyy') => {
  if (!date) return ''
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    return format(dateObj, formatString)
  } catch {
    return ''
  }
}

export const formatDateTime = (date) => {
  return formatDate(date, 'MMM dd, yyyy HH:mm')
}

export const formatRelativeTime = (date) => {
  if (!date) return ''
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    return formatDistanceToNow(dateObj, { addSuffix: true })
  } catch {
    return ''
  }
}

// String utilities
export const capitalize = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const truncate = (str, length = 50, suffix = '...') => {
  if (!str || str.length <= length) return str
  return str.substring(0, length) + suffix
}

export const slugify = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Number utilities
export const formatNumber = (num, decimals = 0) => {
  if (num === null || num === undefined) return '0'
  return Number(num).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount)
}

export const formatPercentage = (value, decimals = 1) => {
  return `${Number(value).toFixed(decimals)}%`
}

// Array utilities
export const uniqueBy = (array, key) => {
  const seen = new Set()
  return array.filter((item) => {
    const value = typeof key === 'function' ? key(item) : item[key]
    if (seen.has(value)) return false
    seen.add(value)
    return true
  })
}

export const groupBy = (array, key) => {
  return array.reduce((groups, item) => {
    const group = typeof key === 'function' ? key(item) : item[key]
    groups[group] = groups[group] || []
    groups[group].push(item)
    return groups
  }, {})
}

// Object utilities
export const pick = (obj, keys) => {
  return keys.reduce((picked, key) => {
    if (key in obj) picked[key] = obj[key]
    return picked
  }, {})
}

export const omit = (obj, keys) => {
  const keysSet = new Set(keys)
  return Object.keys(obj)
    .filter(key => !keysSet.has(key))
    .reduce((omitted, key) => {
      omitted[key] = obj[key]
      return omitted
    }, {})
}

// Validation utilities
export const isEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isPhoneNumber = (phone) => {
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10
}

export const isStrongPassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return passwordRegex.test(password)
}

// Debounce utility
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle utility
export const throttle = (func, limit) => {
  let inThrottle
  return function() {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Local storage utilities
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch {
      return false
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key)
      return true
    } catch {
      return false
    }
  },

  clear: () => {
    try {
      localStorage.clear()
      return true
    } catch {
      return false
    }
  },
}

// Color utilities
export const getRandomColor = () => {
  const colors = [
    '#ef4444', '#f97316', '#f59e0b', '#eab308',
    '#84cc16', '#22c55e', '#10b981', '#14b8a6',
    '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
    '#8b5cf6', '#a855f7', '#d946ef', '#ec4899'
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

export const getContrastColor = (hexColor) => {
  const r = parseInt(hexColor.slice(1, 3), 16)
  const g = parseInt(hexColor.slice(3, 5), 16)
  const b = parseInt(hexColor.slice(5, 7), 16)
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000
  return (yiq >= 128) ? '#000000' : '#ffffff'
}

// File utilities
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export const getFileExtension = (filename) => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2)
}

// Academic utilities
export const calculateGPA = (grades) => {
  if (!grades || grades.length === 0) return 0
  
  const gradePoints = {
    'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'D-': 0.7,
    'F': 0.0
  }
  
  let totalPoints = 0
  let totalCredits = 0
  
  grades.forEach(grade => {
    const points = gradePoints[grade.grade] || 0
    const credits = grade.credits || 3
    totalPoints += points * credits
    totalCredits += credits
  })
  
  return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0
}

export const getGradeColor = (grade) => {
  const colors = {
    'A': 'text-green-600', 'A-': 'text-green-600',
    'B+': 'text-blue-600', 'B': 'text-blue-600', 'B-': 'text-blue-600',
    'C+': 'text-yellow-600', 'C': 'text-yellow-600', 'C-': 'text-yellow-600',
    'D+': 'text-orange-600', 'D': 'text-orange-600', 'D-': 'text-orange-600',
    'F': 'text-red-600'
  }
  return colors[grade] || 'text-gray-600'
}

// Performance utilities
export const measurePerformance = (name, fn) => {
  const start = performance.now()
  const result = fn()
  const end = performance.now()
  console.log(`${name} took ${end - start} milliseconds`)
  return result
}

// Error handling utilities
export const getErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message
  }
  if (error.message) {
    return error.message
  }
  return 'An unexpected error occurred'
}

export const logError = (error, context = '') => {
  console.error(`Error${context ? ` in ${context}` : ''}:`, error)
}