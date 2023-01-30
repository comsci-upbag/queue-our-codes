import styles from '@/styles/LoadingIndicator.module.css'

export default function LoadingIndicator() {
  return (
    <div className={styles.container}>
      <div className={styles.lds_ellipsis}><div></div><div></div><div></div><div></div></div>
    </div>
  )
}