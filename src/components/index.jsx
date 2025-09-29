// Common Components
export { default as Layout } from './common/Layout'
export { default as Header } from './common/Header'
export { default as Sidebar } from './common/Sidebar'

// UI Components
export { default as Button } from './ui/Button'
export { default as Loading, PageLoading, Skeleton } from './ui/Loading'
export { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from './ui/Card'

// Auth Components
export { default as Login } from './auth/Login'

// Student Components
export { default as StudentDashboard } from './student/StudentDashboard'
export { default as StudentProfile } from './student/StudentProfile'
export { default as SubjectBrowser } from './student/SubjectBrowser'

// Admin Components
export { default as AdminDashboard } from './admin/AdminDashboard'
export { default as StudentManagement } from './admin/StudentManagement'
export { default as DepartmentManagement } from './admin/DepartmentManagement'
export { default as SubjectManagement } from './admin/SubjectManagement'
export { default as EnrollmentManagement } from './admin/EnrollmentManagement'
export { default as SystemAnalytics } from './admin/SystemAnalytics'

// Placeholder components for future implementation
export const PlaceholderComponent = ({ title = "Component" }) => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="text-2xl">🚧</span>
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600">This component is under development</p>
    </div>
  </div>
)

// Re-export hooks and utilities
export { useAuth } from '../hooks/useAuth'
export { cn, formatDate, formatNumber } from '../utils/helpers'