import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './hooks/useAuth'
import Layout from './components/common/Layout'
import Login from './components/auth/Login'
import StudentDashboard from './components/student/StudentDashboard'
import AdminDashboard from './components/admin/AdminDashboard'
import StudentProfile from './components/student/StudentProfile'
import SubjectBrowser from './components/student/SubjectBrowser'
import StudentManagement from './components/admin/StudentManagement'
import DepartmentManagement from './components/admin/DepartmentManagement'
import SubjectManagement from './components/admin/SubjectManagement'
import EnrollmentManagement from './components/admin/EnrollmentManagement'
import SystemAnalytics from './components/admin/SystemAnalytics'
import Loading from './components/ui/Loading'

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  )
}

function AppContent() {
  const { user, loading } = useAuth()

  if (loading) {
    return <Loading />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        
        <Route path="/" element={
          user ? (
            <Layout>
              {user.role === 'admin' ? <AdminDashboard /> : <StudentDashboard />}
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        } />

        {/* Student Routes */}
        <Route path="/profile" element={
          user && user.role === 'student' ? (
            <Layout>
              <StudentProfile />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        } />

        <Route path="/subjects" element={
          user && user.role === 'student' ? (
            <Layout>
              <SubjectBrowser />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        } />

        {/* Admin Routes */}
        <Route path="/admin/students" element={
          user && user.role === 'admin' ? (
            <Layout>
              <StudentManagement />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        } />

        <Route path="/admin/departments" element={
          user && user.role === 'admin' ? (
            <Layout>
              <DepartmentManagement />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        } />

        <Route path="/admin/subjects" element={
          user && user.role === 'admin' ? (
            <Layout>
              <SubjectManagement />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        } />

        <Route path="/admin/enrollments" element={
          user && user.role === 'admin' ? (
            <Layout>
              <EnrollmentManagement />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        } />

        <Route path="/admin/analytics" element={
          user && user.role === 'admin' ? (
            <Layout>
              <SystemAnalytics />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        } />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App