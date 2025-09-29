import React, { useState, useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { studentService } from '../../services/student'
import { Search, Filter, BookOpen, Clock, Users, Star, CheckCircle, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/Card'
import Button from '../ui/Button'
import Loading from '../ui/Loading'
import { formatNumber, getRandomColor } from '../../utils/helpers'
import toast from 'react-hot-toast'

const SubjectBrowser = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedLevel, setSelectedLevel] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const queryClient = useQueryClient()

  // Fetch subjects and departments
  const { data: subjectsData, isLoading: subjectsLoading } = useQuery({
    queryKey: ['subjects'],
    queryFn: () => studentService.getSubjects(),
  })

  // Fetch current enrollments
  const { data: enrollmentsData, isLoading: enrollmentsLoading } = useQuery({
    queryKey: ['enrollments'],
    queryFn: () => studentService.getEnrollments(),
  })

  // Enroll mutation
  const enrollMutation = useMutation({
    mutationFn: ({ subjectId }) => studentService.enrollInSubject(subjectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enrollments'] })
      toast.success('Successfully enrolled in subject!')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to enroll in subject')
    },
  })

  const subjects = subjectsData?.data || []
  const enrollments = enrollmentsData?.data || []
  const enrolledSubjectIds = new Set(enrollments.map(e => e.subjectId))

  // Get unique departments from subjects
  const departments = useMemo(() => {
    const deptSet = new Set(subjects.map(s => s.department?.name).filter(Boolean))
    return Array.from(deptSet)
  }, [subjects])

  // Filter subjects
  const filteredSubjects = useMemo(() => {
    return subjects.filter(subject => {
      const matchesSearch = subject.subjectName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          subject.subjectId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          subject.description?.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesDepartment = selectedDepartment === 'all' || 
                               subject.department?.name === selectedDepartment
      
      const matchesLevel = selectedLevel === 'all' || 
                          (selectedLevel === 'undergraduate' && subject.credits <= 3) ||
                          (selectedLevel === 'graduate' && subject.credits > 3)

      return matchesSearch && matchesDepartment && matchesLevel
    })
  }, [subjects, searchTerm, selectedDepartment, selectedLevel])

  const handleEnroll = (subjectId) => {
    enrollMutation.mutate({ subjectId })
  }

  if (subjectsLoading || enrollmentsLoading) {
    return <Loading />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Subject Browser</h1>
          <p className="text-gray-600 mt-1">
            Browse and enroll in available subjects
          </p>
        </div>
        <Button
          variant="outline"
          leftIcon={<Filter className="w-4 h-4" />}
          onClick={() => setShowFilters(!showFilters)}
        >
          Filters
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search subjects by name, code, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input pl-10"
          />
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="form-label">Department</label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="form-select"
                  >
                    <option value="all">All Departments</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="form-label">Level</label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="form-select"
                  >
                    <option value="all">All Levels</option>
                    <option value="undergraduate">Undergraduate</option>
                    <option value="graduate">Graduate</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSelectedDepartment('all')
                      setSelectedLevel('all')
                      setSearchTerm('')
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Count */}
        <div className="text-sm text-gray-600">
          Showing {filteredSubjects.length} of {subjects.length} subjects
        </div>
      </div>

      {/* Subjects Grid */}
      {filteredSubjects.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No subjects found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or filters
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.map((subject) => {
            const isEnrolled = enrolledSubjectIds.has(subject.subjectId)
            const isEnrolling = enrollMutation.isPending && 
                              enrollMutation.variables?.subjectId === subject.subjectId

            return (
              <Card key={subject.subjectId} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">
                        {subject.subjectName}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        {subject.subjectId}
                      </p>
                    </div>
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                      style={{ backgroundColor: getRandomColor() }}
                    >
                      {subject.subjectId?.substring(0, 2)}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-1">
                  <p className="text-sm text-gray-700 mb-4">
                    {subject.description || 'No description available'}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <BookOpen className="w-4 h-4 mr-2" />
                      <span>{subject.credits || 3} Credits</span>
                    </div>
                    
                    {subject.department && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{subject.department.name}</span>
                      </div>
                    )}
                    
                    {subject.prerequisites && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>Prerequisites required</span>
                      </div>
                    )}
                    
                    {subject.instructor && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        <span>{subject.instructor}</span>
                      </div>
                    )}
                  </div>
                  
                  {subject.schedule && (
                    <div className="mt-3 p-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-600">
                        <strong>Schedule:</strong> {subject.schedule}
                      </p>
                    </div>
                  )}
                </CardContent>
                
                <CardFooter>
                  {isEnrolled ? (
                    <Button
                      variant="success"
                      className="w-full"
                      leftIcon={<CheckCircle className="w-4 h-4" />}
                      disabled
                    >
                      Enrolled
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      leftIcon={<Plus className="w-4 h-4" />}
                      onClick={() => handleEnroll(subject.subjectId)}
                      loading={isEnrolling}
                      disabled={isEnrolling}
                    >
                      Enroll Now
                    </Button>
                  )}
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SubjectBrowser