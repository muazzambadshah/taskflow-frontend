import styles from './TaskList.module.css'

export default function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>📭</div>
        <p>No tasks found. Add one above!</p>
      </div>
    )
  }

  return (
    <div className={styles.list}>
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={() => onToggle(task)}
          onEdit={() => onEdit(task)}
          onDelete={() => onDelete(task.id)}
        />
      ))}
    </div>
  )
}

function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const date = new Date(task.createdAt).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric'
  })

  return (
    <div className={`${styles.card} ${task.done ? styles.done : ''}`}>
      {/* Checkbox */}
      <button
        className={`${styles.check} ${task.done ? styles.checked : ''}`}
        onClick={onToggle}
        aria-label="Toggle done"
      >
        {task.done && '✓'}
      </button>

      {/* Content */}
      <div className={styles.body}>
        <div className={styles.taskTitle}>{task.title}</div>
        <div className={styles.meta}>
          <span className={`${styles.badge} ${styles[task.priority]}`}>{task.priority}</span>
          <span className={`${styles.badge} ${styles.cat}`}>{task.category}</span>
          <span className={styles.date}>{date}</span>
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button className={styles.editBtn} onClick={onEdit}>Edit</button>
        <button className={styles.deleteBtn} onClick={onDelete}>Delete</button>
      </div>
    </div>
  )
}
