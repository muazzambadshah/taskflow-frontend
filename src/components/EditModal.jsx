import { useState } from 'react'
import styles from './EditModal.module.css'

const CATEGORIES = ['General', 'Backend', 'Frontend', 'DevOps', 'Design']

export default function EditModal({ task, onClose, onSave }) {
  const [form, setForm] = useState({
    title: task.title,
    priority: task.priority,
    category: task.category,
  })
  const [loading, setLoading] = useState(false)

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const save = async () => {
    if (!form.title.trim()) return
    try {
      setLoading(true)
      await onSave(form)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Edit Task</h2>

        <div className={styles.field}>
          <label>Title</label>
          <input name="title" value={form.title} onChange={handle} />
        </div>
        <div className={styles.field}>
          <label>Priority</label>
          <select name="priority" value={form.priority} onChange={handle}>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div className={styles.field}>
          <label>Category</label>
          <select name="category" value={form.category} onChange={handle}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onClose}>Cancel</button>
          <button className={styles.save} onClick={save} disabled={loading}>
            {loading ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
