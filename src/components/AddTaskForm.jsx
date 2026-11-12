import { useState } from 'react'
import styles from './AddTaskForm.module.css'

const CATEGORIES = ['General', 'Backend', 'Frontend', 'DevOps', 'Design']

export default function AddTaskForm({ onCreate }) {
  const [form, setForm] = useState({ title: '', priority: 'medium', category: 'General' })
  const [loading, setLoading] = useState(false)

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async () => {
    if (!form.title.trim()) return
    try {
      setLoading(true)
      await onCreate(form)
      setForm(f => ({ ...f, title: '' }))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.box}>
      <h3 className={styles.title}>+ New Task</h3>
      <div className={styles.row}>
        <input
          className={styles.titleInput}
          name="title"
          placeholder="What needs to be done?"
          value={form.title}
          onChange={handle}
          onKeyDown={e => e.key === 'Enter' && submit()}
        />
        <select name="priority" value={form.priority} onChange={handle} className={styles.select}>
          <option value="high">🔴 High</option>
          <option value="medium">🟡 Medium</option>
          <option value="low">🟢 Low</option>
        </select>
        <select name="category" value={form.category} onChange={handle} className={styles.select}>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <button className={styles.btn} onClick={submit} disabled={loading || !form.title.trim()}>
          {loading ? '…' : 'Add Task'}
        </button>
      </div>
    </div>
  )
}
