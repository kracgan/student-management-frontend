import api from './api'

export const studentService = {
  // Student profile
  getProfile: async () => {
    return api.get('/students/profile')
  },

  updateProfile: async (data) => {
    return api.put('/students/profile', data)
  },

  // Subjects
  getSubjects: async (params = {}) => {
    return api.get('/subjects', { params })
  },

  getSubject: async (id) => {
    return api.get(`/subjects/${id}`)
  },

  // Enrollments
  getEnrollments: async () => {
    return api.get('/enrollments/my-enrollments')
  },

  enrollInSubject: async (subjectId) => {
    return api.post('/enrollments/enroll', { subjectId })
  },

  dropSubject: async (enrollmentId) => {
    return api.delete(`/enrollments/${enrollmentId}`)
  },

  // Academic progress
  getAcademicProgress: async () => {
    return api.get('/students/academic-progress')
  },

  getTranscript: async () => {
    return api.get('/students/transcript')
  },

  // ID Card
  getIDCard: async () => {
    return api.get('/students/id-card')
  },

  // Schedule
  getSchedule: async (semester) => {
    return api.get('/students/schedule', { params: { semester } })
  },

  // Notifications
  getNotifications: async () => {
    return api.get('/students/notifications')
  },

  markNotificationAsRead: async (id) => {
    return api.put(`/students/notifications/${id}/read`)
  },
}

export default studentService