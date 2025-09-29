import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  User, 
  BookOpen, 
  Users, 
  Building, 
  GraduationCap, 
  FileText, 
  BarChart3, 
  Settings,
  LogOut
} from 'lucide-react'
import { cn } from '../../utils/helpers'

const Sidebar = ({ user, isOpen, isCollapsed, onClose }) => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  const studentMenu = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/subjects', icon: BookOpen, label: 'Subjects' },
    { path: '/schedule', icon: FileText, label: 'Schedule' },
    { path: '/grades', icon: GraduationCap, label: 'Grades' },
  ]

  const adminMenu = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/admin/students', icon: Users, label: 'Students' },
    { path: '/admin/departments', icon: Building, label: 'Departments' },
    { path: '/admin/subjects', icon: BookOpen, label: 'Subjects' },
    { path: '/admin/enrollments', icon: GraduationCap, label: 'Enrollments' },
    { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
  ]

  const menuItems = user?.role === 'admin' ? adminMenu : studentMenu

  return (
    <>
      {/* Mobile sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SidebarContent
          user={user}
          menuItems={menuItems}
          isActive={isActive}
          isCollapsed={false}
        />
      </div>

      {/* Desktop sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-40 bg-white border-r border-gray-200 transition-all duration-300 ease-in-out hidden lg:block',
          isCollapsed ? 'w-20' : 'w-64'
        )}
      >
        <SidebarContent
          user={user}
          menuItems={menuItems}
          isActive={isActive}
          isCollapsed={isCollapsed}
        />
      </div>
    </>
  )
}

const SidebarContent = ({ user, menuItems, isActive, isCollapsed }) => {
  return (
    <div className="h-full flex flex-col">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <span className="text-lg font-bold text-gray-900">
              Student SMS
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
                isActive(item.path)
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
                isCollapsed && 'justify-center'
              )}
            >
              <Icon
                className={cn(
                  'w-5 h-5',
                  !isCollapsed && 'mr-3'
                )}
              />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-gray-200 p-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {user?.role || 'Student'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar