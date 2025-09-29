import React, { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
  const { user } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        user={user}
        isOpen={sidebarOpen}
        isCollapsed={sidebarCollapsed}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main wrapper */}
      <div
        className={`main-content transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}
      >
        {/* Header */}
        <Header
          user={user}
          onToggleSidebar={toggleSidebar}
          onToggleSidebarCollapse={toggleSidebarCollapse}
          sidebarCollapsed={sidebarCollapsed}
        />

        {/* Page content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default Layout