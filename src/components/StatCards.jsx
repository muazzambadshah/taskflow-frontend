import styles from './StatCards.module.css'

export default function StatCards({ stats, progress }) {
  return (
    <>
      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.num}>{stats.total}</div>
          <div className={styles.label}>Total Tasks</div>
          <div className={`${styles.bar} ${styles.barAccent}`} />
        </div>
        <div className={styles.card}>
          <div className={styles.num} style={{ color: 'var(--warning)' }}>{stats.pending}</div>
          <div className={styles.label}>Pending</div>
          <div className={`${styles.bar} ${styles.barWarning}`} />
        </div>
        <div className={styles.card}>
          <div className={styles.num} style={{ color: 'var(--accent3)' }}>{stats.done}</div>
          <div className={styles.label}>Completed</div>
          <div className={`${styles.bar} ${styles.barGreen}`} />
        </div>
        <div className={styles.card}>
          <div className={styles.num} style={{ color: 'var(--danger)' }}>{stats.high}</div>
          <div className={styles.label}>High Priority</div>
          <div className={`${styles.bar} ${styles.barDanger}`} />
        </div>
      </div>

      <div className={styles.progressWrap}>
        <div className={styles.progressLabel}>
          <span>Overall Progress</span><span>{progress}%</span>
        </div>
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
      </div>
    </>
  )
}
