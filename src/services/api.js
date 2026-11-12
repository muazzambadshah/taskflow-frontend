import axios from 'axios'

// ── Base URL ───────────────────────────────────────────────────────────────
// In dev: Vite proxy forwards /api → http://localhost:5000
// In prod: Change to your Railway/Render URL
const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
})

// ── Auto-attach JWT token to every request ─────────────────────────────────
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ── Auto-logout on 401 Unauthorized ───────────────────────────────────────
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

// ── AUTH ───────────────────────────────────────────────────────────────────
export const authAPI = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }).then(r => {
      localStorage.setItem('token', r.data.token)
      return r.data
    }),

  register: (name, email, password) =>
    api.post('/auth/register', { name, email, password }).then(r => {
      localStorage.setItem('token', r.data.token)
      return r.data
    }),

  me: () => api.get('/auth/me').then(r => r.data),

  logout: () => localStorage.removeItem('token')
}

// ── TASKS ──────────────────────────────────────────────────────────────────
export const tasksAPI = {
  getAll:   ()          => api.get('/tasks').then(r => r.data),
  getById:  (id)        => api.get(`/tasks/${id}`).then(r => r.data),
  create:   (data)      => api.post('/tasks', data).then(r => r.data),
  update:   (id, data)  => api.put(`/tasks/${id}`, data).then(r => r.data),
  delete:   (id)        => api.delete(`/tasks/${id}`)
}

export default api
