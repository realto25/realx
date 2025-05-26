// import axios from 'axios'
// import * as SecureStore from 'expo-secure-store'

// const API_URL = 'https://your-strapi-api.com/api' // Replace with your Strapi URL

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   }
// })

// // Add auth token to requests
// api.interceptors.request.use(async (config) => {
//   const token = await SecureStore.getItemAsync('token')
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })

// export const login = async ({ phone, role }: { phone: string; role: string }) => {
//   const response = await api.post('/auth/login', { phone, role })
//   return response.data
// }

// export const verifyOtp = async ({ phone, otp }: { phone: string; otp: string }) => {
//   const response = await api.post('/auth/verify-otp', { phone, otp })
//   return response.data
// }

// export const getProjects = async () => {
//   const response = await api.get('/projects?populate=*')
//   return response.data.data
// }

// export const getProjectPlots = async (projectId: string) => {
//   const response = await api.get(`/plots?filters[project][id]=${projectId}&populate=*`)
//   return response.data.data
// }

// export const bookSiteVisit = async (data: {
//   plotId: string
//   date: string
//   time: string
//   guestId: string
// }) => {
//   const response = await api.post('/site-visits', { data })
//   return response.data.data
// }

// // Client APIs
// export const getClientPlots = async () => {
//   const response = await api.get('/client/plots')
//   return response.data
// }

// export const requestToSellPlot = async (plotId: string) => {
//   const response = await api.post('/sell-requests', { plotId })
//   return response.data
// }

// // Manager APIs
// export const getManagerLeads = async () => {
//   const response = await api.get('/manager/leads')
//   return response.data
// }

// export const approveVisit = async (visitId: string) => {
//   const response = await api.put(`/site-visits/${visitId}/approve`)
//   return response.data
// }

// export const markAttendance = async (location: { lat: number; lng: number }) => {
//   const response = await api.post('/attendance', { location })
//   return response.data
// }