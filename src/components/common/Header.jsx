import React, { useState } from 'react'
import { Bell, Menu, Search, User, Settings, LogOut, ChevronDown } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import Button from '../ui/Button'

const Header = ({ user, onToggleSidebar, onToggleSidebarCollapse, sidebarCollapsed }) => {
  const { logout } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="header bg-white border-b border-gray-200">
      <div className="h-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
          {/* Left side */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Desktop sidebar toggle */}
            <button
              onClick={onToggleSidebarCollapse}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hidden lg:block"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search bar */}
            <div className="hidden md:block ml-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-300 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 relative"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
              </button>

              {/* Notifications dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">New subject enrollment available</p>
                          <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">Grade updated for CS101</p>
                          <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <button className="text-sm text-primary-600 hover:text-primary-700">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
              >
                <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user?.role || 'Student'}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {/* User dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {user?.name || 'User'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {user?.email || 'user@example.com'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <User className="w-4 h-4 mr-3" />
                      Profile
                    </a>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      Settings
                    </a>
                    <div className="border-t border-gray-200 my-2"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header