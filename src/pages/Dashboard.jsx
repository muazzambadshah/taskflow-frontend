import { useState, useMemo } from 'react'
import Navbar      from '../components/Navbar'
import StatCards   from '../components/StatCards'
import AddTaskForm from '../components/AddTaskForm'
import TaskFilters from '../components/TaskFilters'
import TaskList    from '../components/TaskList'
import EditModal   from '../components/EditModal'
import Spinner     from '../components/Spinner'
import { useTasks } from '../hooks/useTasks'
import styles from './Dashboard.module.css'

export default function Dashboard() {
  const {
    tasks, loading, error, stats, progress,
    createTask, updateTask, toggleTask, deleteTask
  } = useTasks()

  const [filter, setFilter]   = useState('all')
  const [search, setSearch]   = useState('')
  const [editTask, setEditTask] = useState(null)

  // JS array methods: filter + find
  const filtered = useMemo(() => tasks
    .filter(t => {
      if (filter === 'done')    return t.done
      if (filter === 'pending') return !t.done
      if (filter === 'high' || filter === 'medium' || filter === 'low')
        return t.priority === filter
      return true
    })
    .filter(t => t.title.toLowerCase().includes(search.toLowerCase())),
    [tasks, filter, search]
  )

  if (loading) return <Spinner fullscreen />

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        {error && <p className={styles.error}>{error}</p>}

        <StatCards stats={stats} progress={progress} />
        <AddTaskForm onCreate={createTask} />
        <TaskFilters filter={filter} setFilter={setFilter}
                     search={search}  setSearch={setSearch} />

        <TaskList
          tasks={filtered}
          onToggle={toggleTask}
          onEdit={setEditTask}
          onDelete={deleteTask}
        />
      </main>

      {editTask && (
        <EditModal
          task={editTask}
          onClose={() => setEditTask(null)}
          onSave={async (data) => {
            await updateTask(editTask.id, data)
            setEditTask(null)
          }}
        />
      )}
    </div>
  )
}
