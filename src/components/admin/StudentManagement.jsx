import React, { useState, useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { adminService } from '../../services/admin'
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Download,
  Upload,
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  MoreVertical
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card'
import Button from '../ui/Button'
import Loading from '../ui/Loading'
import { formatDate, formatNumber, getRandomColor } from '../../utils/helpers'
import toast from 'react-hot-toast'

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const queryClient = useQueryClient()

  // Fetch students
  const { data: studentsData, isLoading: studentsLoading } = useQuery({
    queryKey: ['students'],
    queryFn: () => adminService.getStudents(),
  })

  // Fetch departments
  const { data: departmentsData } = useQuery({
    queryKey: ['departments'],
    queryFn: () => adminService.getDepartments(),
  })

  // Create student mutation
  const createStudentMutation = useMutation({
    mutationFn: (data) => adminService.createStudent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
      toast.success('Student created successfully!')
      setShowAddModal(false)
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create student')
    },
  })

  // Update student mutation
  const updateStudentMutation = useMutation({
    mutationFn: ({ id, data }) => adminService.updateStudent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
      toast.success('Student updated successfully!')
      setShowEditModal(false)
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update student')
    },
  })

  // Delete student mutation
  const deleteStudentMutation = useMutation({
    mutationFn: (id) => adminService.deleteStudent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] })
      toast.success('Student deleted successfully!')
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete student')
    },
  })

  const students = studentsData?.data || []
  const departments = departmentsData?.data || []

  // Filter students
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.studentId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.email?.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesDepartment = selectedDepartment === 'all' || 
                               student.department?.deptId === selectedDepartment

      return matchesSearch && matchesDepartment
    })
  }, [students, searchTerm, selectedDepartment])

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage)
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleAddStudent = (data) => {
    createStudentMutation.mutate(data)
  }

  const handleEditStudent = (student) => {
    setSelectedStudent(student)
    setShowEditModal(true)
  }

  const handleViewStudent = (student) => {
    setSelectedStudent(student)
    setShowViewModal(true)
  }

  const handleDeleteStudent = (studentId) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      deleteStudentMutation.mutate(studentId)
    }
  }

  const handleUpdateStudent = (data) => {
    if (selectedStudent) {
      updateStudentMutation.mutate({ 
        id: selectedStudent.studentId, 
        data 
      })
    }
  }

  if (studentsLoading) {
    return <Loading />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
          <p className="text-gray-600 mt-1">
            Manage student records and academic information
          </p>
        </div>
        <Button
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => setShowAddModal(true)}
        >
          Add Student
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search students by name, ID, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input pl-10"
                />
              </div>
            </div>

            {/* Department Filter */}
            <div className="md:w-48">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="form-select"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept.deptId} value={dept.deptId}>
                    {dept.deptName}
                  </option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                leftIcon={<Upload className="w-4 h-4" />}
              >
                Import
              </Button>
              <Button
                variant="outline"
                leftIcon={<Download className="w-4 h-4" />}
              >
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Students ({formatNumber(filteredStudents.length)})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {paginatedStudents.length === 0 ? (
            <div className="text-center py-12">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No students found</h3>
              <p className="text-gray-600">
                Try adjusting your search criteria or filters
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Student</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">ID</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Department</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Email</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Phone</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedStudents.map((student) => (
                    <tr key={student.studentId} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                            style={{ backgroundColor: getRandomColor() }}
                          >
                            {student.name?.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{student.name}</p>
                            <p className="text-sm text-gray-500">
                              {formatDate(student.dob)}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-900">{student.studentId}</td>
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {student.department?.deptName || 'N/A'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-900">{student.email}</td>
                      <td className="py-4 px-4 text-gray-900">{student.phone || 'N/A'}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewStudent(student)}
                            className="p-1 text-gray-400 hover:text-gray-600"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditStudent(student)}
                            className="p-1 text-gray-400 hover:text-blue-600"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteStudent(student.studentId)}
                            className="p-1 text-gray-400 hover:text-red-600"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-700">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
                {Math.min(currentPage * itemsPerPage, filteredStudents.length)} of{' '}
                {filteredStudents.length} results
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Modals would go here */}
      {/* For brevity, I'm including a simple modal structure */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Add New Student</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Student creation form would be implemented here with proper validation and fields.
              </p>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1"
                >
                  Create Student
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export default StudentManagement