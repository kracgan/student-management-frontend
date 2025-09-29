import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { studentService } from '../../services/student'
import { 
  BookOpen, 
  Calendar, 
  Award, 
  Clock, 
  TrendingUp,
  Users,
  FileText,
  CheckCircle
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import Button from '../ui/Button'
import Loading from '../ui/Loading'
import { formatDate, calculateGPA, getRandomColor } from '../../utils/helpers'

const StudentDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Fetch dashboard data
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ['student-dashboard'],
    queryFn: async () => {
      const [profile, enrollments, subjects] = await Promise.all([
        studentService.getProfile(),
        studentService.getEnrollments(),
        studentService.getSubjects(),
      ])
      
      return {
        profile: profile.data,
        enrollments: enrollments.data,
        subjects: subjects.data,
      }
    },
  })

  if (isLoading) {
    return <Loading />
  }

  const { profile, enrollments, subjects } = dashboardData || {}
  const currentEnrollments = enrollments?.filter(e => e.status === 'active') || []
  const completedCourses = enrollments?.filter(e => e.status === 'completed') || []
  const gpa = calculateGPA(completedCourses)

  // Mock data for demonstration
  const upcomingDeadlines = [
    { id: 1, title: 'CS101 Assignment Due', date: '2025-01-15', type: 'assignment' },
    { id: 2, title: 'MATH201 Midterm Exam', date: '2025-01-20', type: 'exam' },
    { id: 3, title: 'Project Proposal Submission', date: '2025-01-25', type: 'project' },
  ]

  const recentActivity = [
    { id: 1, action: 'Enrolled in CS301', date: '2025-01-10', icon: BookOpen },
    { id: 2, action: 'Grade updated: A in CS101', date: '2025-01-08', icon: Award },
    { id: 3, action: 'Submitted assignment', date: '2025-01-05', icon: FileText },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {profile?.name || 'Student'}!
            </h1>
            <p className="text-blue-100">
              {formatDate(currentTime, 'EEEE, MMMM d, yyyy')} • {formatDate(currentTime, 'h:mm a')}
            </p>
          </div>
          <div className="hidden md:block">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <Users className="w-10 h-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gpa}</div>
            <p className="text-xs text-muted-foreground">
              Based on {completedCourses.length} completed courses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentEnrollments.length}</div>
            <p className="text-xs text-muted-foreground">
              This semester
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Credits Earned</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {completedCourses.reduce((sum, course) => sum + (course.credits || 3), 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Total credits completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">
              This semester
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Courses */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Current Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentEnrollments.slice(0, 4).map((enrollment) => (
                  <div
                    key={enrollment.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: getRandomColor() }}
                      >
                        {enrollment.subjectName?.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {enrollment.subjectName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {enrollment.subjectId} • {enrollment.credits || 3} credits
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {enrollment.instructor || 'TBD'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {enrollment.schedule || 'TBA'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link to="/subjects">
                  <Button variant="outline" className="w-full">
                    Browse More Subjects
                  </Button>
                </Link>
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
              <Link to="/subjects">
                <Button className="w-full" leftIcon={<BookOpen className="w-4 h-4" />}>
                  Enroll in Subjects
                </Button>
              </Link>
              <Link to="/schedule">
                <Button
                  variant="outline"
                  className="w-full"
                  leftIcon={<Calendar className="w-4 h-4" />}
                >
                  View Schedule
                </Button>
              </Link>
              <Link to="/grades">
                <Button
                  variant="outline"
                  className="w-full"
                  leftIcon={<FileText className="w-4 h-4" />}
                >
                  View Transcript
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingDeadlines.map((deadline) => (
                  <div key={deadline.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {deadline.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(deadline.date)}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <span
                        className={cn(
                          'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                          deadline.type === 'exam'
                            ? 'bg-red-100 text-red-800'
                            : deadline.type === 'assignment'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        )}
                      >
                        {deadline.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity) => {
                  const Icon = activity.icon
                  return (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <Icon className="w-4 h-4 text-gray-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">
                          {formatDate(activity.date)}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard