import api from './api'

export const adminService = {
  // Dashboard
  getDashboardStats: async () => {
    return api.get('/admin/dashboard/stats')
  },

  getSystemAnalytics: async () => {
    return api.get('/admin/analytics')
  },

  // Student management
  getStudents: async (params = {}) => {
    return api.get('/admin/students', { params })
  },

  getStudent: async (id) => {
    return api.get(`/admin/students/${id}`)
  },

  createStudent: async (data) => {
    return api.post('/admin/students', data)
  },

  updateStudent: async (id, data) => {
    return api.put(`/admin/students/${id}`, data)
  },

  deleteStudent: async (id) => {
    return api.delete(`/admin/students/${id}`)
  },

  // Department management
  getDepartments: async (params = {}) => {
    return api.get('/admin/departments', { params })
  },

  getDepartment: async (id) => {
    return api.get(`/admin/departments/${id}`)
  },

  createDepartment: async (data) => {
    return api.post('/admin/departments', data)
  },

  updateDepartment: async (id, data) => {
    return api.put(`/admin/departments/${id}`, data)
  },

  deleteDepartment: async (id) => {
    return api.delete(`/admin/departments/${id}`)
  },

  // Subject management
  getSubjects: async (params = {}) => {
    return api.get('/admin/subjects', { params })
  },

  getSubject: async (id) => {
    return api.get(`/admin/subjects/${id}`)
  },

  createSubject: async (data) => {
    return api.post('/admin/subjects', data)
  },

  updateSubject: async (id, data) => {
    return api.put(`/admin/subjects/${id}`, data)
  },

  deleteSubject: async (id) => {
    return api.delete(`/admin/subjects/${id}`)
  },

  // Enrollment management
  getEnrollments: async (params = {}) => {
    return api.get('/admin/enrollments', { params })
  },

  getEnrollment: async (id) => {
    return api.get(`/admin/enrollments/${id}`)
  },

  createEnrollment: async (data) => {
    return api.post('/admin/enrollments', data)
  },

  updateEnrollment: async (id, data) => {
    return api.put(`/admin/enrollments/${id}`, data)
  },

  deleteEnrollment: async (id) => {
    return api.delete(`/admin/enrollments/${id}`)
  },

  // User management
  getUsers: async (params = {}) => {
    return api.get('/admin/users', { params })
  },

  getUser: async (id) => {
    return api.get(`/admin/users/${id}`)
  },

  createUser: async (data) => {
    return api.post('/admin/users', data)
  },

  updateUser: async (id, data) => {
    return api.put(`/admin/users/${id}`, data)
  },

  deleteUser: async (id) => {
    return api.delete(`/admin/users/${id}`)
  },

  // Reports
  generateReport: async (type, params = {}) => {
    return api.get(`/admin/reports/${type}`, { params })
  },

  exportData: async (format, params = {}) => {
    return api.get(`/admin/export/${format}`, { 
      params,
      responseType: 'blob'
    })
  },

  // System settings
  getSettings: async () => {
    return api.get('/admin/settings')
  },

  updateSettings: async (data) => {
    return api.put('/admin/settings', data)
  },

  // Bulk operations
  bulkEnrollStudents: async (data) => {
    return api.post('/admin/enrollments/bulk', data)
  },

  bulkUpdateStudents: async (data) => {
    return api.put('/admin/students/bulk', data)
  },

  // Audit logs
  getAuditLogs: async (params = {}) => {
    return api.get('/admin/audit-logs', { params })
  },
}

export default adminService