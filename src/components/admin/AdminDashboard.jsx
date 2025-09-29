import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { adminService } from '../../services/admin'
import { 
  Users, 
  BookOpen, 
  Building, 
  GraduationCap, 
  TrendingUp,
  Activity,
  DollarSign,
  PieChart,
  BarChart3,
  Calendar,
  FileText,
  Settings
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import Button from '../ui/Button'
import Loading from '../ui/Loading'
import { formatNumber, getRandomColor } from '../../utils/helpers'

const AdminDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Fetch dashboard data
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['admin-dashboard'],
    queryFn: async () => {
      const [stats, analytics] = await Promise.all([
        adminService.getDashboardStats(),
        adminService.getSystemAnalytics(),
      ])
      
      return {
        stats: stats.data,
        analytics: analytics.data,
      }
    },
  })

  if (isLoading) {
    return <Loading />
  }

  const { stats, analytics } = dashboardData || {}

  // Mock data for demonstration
  const recentEnrollments = [
    { id: 1, student: 'John Doe', subject: 'CS101', date: '2025-01-10', status: 'active' },
    { id: 2, student: 'Jane Smith', subject: 'MATH201', date: '2025-01-09', status: 'active' },
    { id: 3, student: 'Bob Johnson', subject: 'PHYS101', date: '2025-01-08', status: 'pending' },
    { id: 4, student: 'Alice Brown', subject: 'CHEM101', date: '2025-01-07', status: 'active' },
  ]

  const systemAlerts = [
    { id: 1, type: 'warning', message: 'Server CPU usage above 80%', time: '5 min ago' },
    { id: 2, type: 'info', message: 'New semester enrollment opens in 3 days', time: '1 hour ago' },
    { id: 3, type: 'success', message: 'Database backup completed successfully', time: '2 hours ago' },
  ]

  const enrollmentTrends = [
    { month: 'Jan', enrollments: 120 },
    { month: 'Feb', enrollments: 150 },
    { month: 'Mar', enrollments: 180 },
    { month: 'Apr', enrollments: 220 },
    { month: 'May', enrollments: 190 },
    { month: 'Jun', enrollments: 240 },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, Administrator!
            </h1>
            <p className="text-purple-100">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })} • {currentTime.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit' 
              })}
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <Settings className="w-10 h-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(stats?.totalStudents || 1247)}</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
              <p className="text-xs text-muted-foreground">
                +12% from last semester
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(stats?.totalSubjects || 89)}</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
              <p className="text-xs text-muted-foreground">
                +5 new this semester
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(stats?.totalDepartments || 12)}</div>
            <p className="text-xs text-muted-foreground">
              Across all faculties
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Enrollments</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(stats?.totalEnrollments || 2156)}</div>
            <div className="flex items-center mt-1">
              <Activity className="w-3 h-3 text-blue-500 mr-1" />
              <p className="text-xs text-muted-foreground">
                This semester
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enrollment Trends Chart */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Enrollment Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-between space-x-2">
                {enrollmentTrends.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
                      style={{ height: `${(data.enrollments / 250) * 200}px` }}
                    ></div>
                    <p className="text-xs text-gray-600 mt-2">{data.month}</p>
                    <p className="text-xs font-medium text-gray-900">{data.enrollments}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                <span>Enrollment growth: <strong className="text-green-600">+18%</strong></span>
                <span>Target: 2,500 students</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/admin/students">
                <Button className="w-full" leftIcon={<Users className="w-4 h-4" />}>
                  Manage Students
                </Button>
              </Link>
              <Link to="/admin/subjects">
                <Button
                  variant="outline"
                  className="w-full"
                  leftIcon={<BookOpen className="w-4 h-4" />}
                >
                  Manage Subjects
                </Button>
              </Link>
              <Link to="/admin/enrollments">
                <Button
                  variant="outline"
                  className="w-full"
                  leftIcon={<GraduationCap className="w-4 h-4" />}
                >
                  View Enrollments
                </Button>
              </Link>
              <Link to="/admin/analytics">
                <Button
                  variant="outline"
                  className="w-full"
                  leftIcon={<BarChart3 className="w-4 h-4" />}
                >
                  System Analytics
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Enrollments */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Enrollments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentEnrollments.map((enrollment) => (
                  <div key={enrollment.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {enrollment.student}
                      </p>
                      <p className="text-xs text-gray-500">
                        {enrollment.subject} • {enrollment.date}
                      </p>
                    </div>
                    <span
                      className={cn(
                        'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                        enrollment.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      )}
                    >
                      {enrollment.status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link to="/admin/enrollments">
                  <Button variant="outline" className="w-full text-sm">
                    View All Enrollments
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {systemAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      <div
                        className={cn(
                          'w-2 h-2 rounded-full',
                          alert.type === 'success' && 'bg-green-400',
                          alert.type === 'warning' && 'bg-yellow-400',
                          alert.type === 'error' && 'bg-red-400',
                          alert.type === 'info' && 'bg-blue-400'
                        )}
                      ></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{alert.message}</p>
                      <p className="text-xs text-gray-500">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard