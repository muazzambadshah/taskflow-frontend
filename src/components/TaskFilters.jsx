import styles from './TaskFilters.module.css'

const FILTERS = ['all', 'pending', 'done', 'high', 'medium', 'low']

export default function TaskFilters({ filter, setFilter, search, setSearch }) {
  return (
    <div className={styles.wrap}>
      <span className={styles.label}>Filter:</span>
      {FILTERS.map(f => (
        <button
          key={f}
          className={`${styles.btn} ${filter === f ? styles.active : ''}`}
          onClick={() => setFilter(f)}
        >
          {f}
        </button>
      ))}
      <input
        className={styles.search}
        placeholder="Search tasks..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </div>
  )
}
