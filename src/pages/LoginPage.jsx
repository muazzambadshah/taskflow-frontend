import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './Auth.module.css'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate  = useNavigate()
  const [form, setForm]   = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async () => {
    setError('')
    if (!form.email || !form.password) return setError('All fields required.')
    try {
      setLoading(true)
      await login(form.email, form.password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.box}>
        <div className={styles.logo}>Task<span>Flow</span></div>
        <p className={styles.sub}>Sign in to your account</p>

        <div className={styles.field}>
          <label>Email</label>
          <input name="email" type="email" placeholder="dev@taskapp.io"
            value={form.email} onChange={handle} />
        </div>
        <div className={styles.field}>
          <label>Password</label>
          <input name="password" type="password" placeholder="••••••••"
            value={form.password} onChange={handle}
            onKeyDown={e => e.key === 'Enter' && submit()} />
        </div>

        {error && <p className={styles.err}>{error}</p>}

        <button className={styles.btn} onClick={submit} disabled={loading}>
          {loading ? 'Signing in…' : 'Sign In →'}
        </button>

        <p className={styles.switch}>
          No account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  )
}
