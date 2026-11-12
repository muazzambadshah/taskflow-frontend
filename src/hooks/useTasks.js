import { useState, useEffect, useCallback, useReducer } from 'react'
import { tasksAPI } from '../services/api'

// ── Reducer ────────────────────────────────────────────────────────────────
function tasksReducer(state, action) {
  switch (action.type) {
    case 'SET':     return action.payload
    case 'ADD':     return [action.payload, ...state]
    case 'UPDATE':  return state.map(t => t.id === action.payload.id ? action.payload : t)
    case 'DELETE':  return state.filter(t => t.id !== action.id)
    default:        return state
  }
}

export function useTasks() {
  const [tasks, dispatch] = useReducer(tasksReducer, [])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState('')

  // ── Fetch all tasks (GET) ────────────────────────────────────────────────
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true)
      const data = await tasksAPI.getAll()
      dispatch({ type: 'SET', payload: data })
    } catch {
      setError('Failed to load tasks.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchTasks() }, [fetchTasks])

  // ── Create task (POST) ───────────────────────────────────────────────────
  const createTask = useCallback(async (data) => {
    const task = await tasksAPI.create(data)
    dispatch({ type: 'ADD', payload: task })
    return task
  }, [])

  // ── Update task (PUT) ────────────────────────────────────────────────────
  const updateTask = useCallback(async (id, data) => {
    const task = await tasksAPI.update(id, data)
    dispatch({ type: 'UPDATE', payload: task })
    return task
  }, [])

  // ── Toggle done ──────────────────────────────────────────────────────────
  const toggleTask = useCallback(async (task) => {
    const updated = await tasksAPI.update(task.id, { done: !task.done })
    dispatch({ type: 'UPDATE', payload: updated })
  }, [])

  // ── Delete task (DELETE) ─────────────────────────────────────────────────
  const deleteTask = useCallback(async (id) => {
    await tasksAPI.delete(id)
    dispatch({ type: 'DELETE', id })
  }, [])

  // ── Computed stats using JS array methods ────────────────────────────────
  const stats = {
    total:   tasks.length,
    done:    tasks.filter(t => t.done).length,
    pending: tasks.filter(t => !t.done).length,
    high:    tasks.filter(t => t.priority === 'high' && !t.done).length,
  }

  const progress = tasks.length
    ? Math.round((stats.done / tasks.length) * 100)
    : 0

  return {
    tasks, loading, error, stats, progress,
    createTask, updateTask, toggleTask, deleteTask, fetchTasks
  }
}
