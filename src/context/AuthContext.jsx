import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { authAPI } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)  // checking token on mount

  // On app load: check if token exists and fetch user
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) { setLoading(false); return }

    authAPI.me()
      .then(setUser)
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setLoading(false))
  }, [])

  const login = useCallback(async (email, password) => {
    const data = await authAPI.login(email, password)
    const me   = await authAPI.me()
    setUser(me)
    return data
  }, [])

  const register = useCallback(async (name, email, password) => {
    const data = await authAPI.register(name, email, password)
    const me   = await authAPI.me()
    setUser(me)
    return data
  }, [])

  const logout = useCallback(() => {
    authAPI.logout()
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
