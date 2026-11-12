import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import LoginPage    from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Dashboard    from './pages/Dashboard'
import Spinner      from './components/Spinner'

// ── Protected Route wrapper ────────────────────────────────────────────────
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <Spinner fullscreen />
  return user ? children : <Navigate to="/login" replace />
}

// ── Public Route (redirect if already logged in) ───────────────────────────
function PublicRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <Spinner fullscreen />
  return user ? <Navigate to="/" replace /> : children
}

// ── Router ─────────────────────────────────────────────────────────────────
function AppRoutes() {
  return (
    <Routes>
      <Route path="/login"    element={<PublicRoute><LoginPage /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />
      <Route path="/"         element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="*"         element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
