import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import styles from './Auth.module.css'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate     = useNavigate()
  const [form, setForm]   = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async () => {
    setError('')
    if (!form.name || !form.email || !form.password) return setError('All fields required.')
    if (form.password.length < 4) return setError('Password must be at least 4 characters.')
    try {
      setLoading(true)
      await register(form.name, form.email, form.password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.box}>
        <div className={styles.logo}>Task<span>Flow</span></div>
        <p className={styles.sub}>Create your free account</p>

        <div className={styles.field}>
          <label>Full Name</label>
          <input name="name" placeholder="John Doe"
            value={form.name} onChange={handle} />
        </div>
        <div className={styles.field}>
          <label>Email</label>
          <input name="email" type="email" placeholder="you@example.com"
            value={form.email} onChange={handle} />
        </div>
        <div className={styles.field}>
          <label>Password</label>
          <input name="password" type="password" placeholder="Min 4 characters"
            value={form.password} onChange={handle}
            onKeyDown={e => e.key === 'Enter' && submit()} />
        </div>

        {error && <p className={styles.err}>{error}</p>}

        <button className={styles.btn} onClick={submit} disabled={loading}>
          {loading ? 'Creating account…' : 'Create Account →'}
        </button>

        <p className={styles.switch}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
