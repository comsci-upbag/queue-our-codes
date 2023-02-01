import styles from '@/styles/LoadingIndicator.module.css'

export default function LoadingIndicator() {
  return (
    <div className={styles.container} style={{
      width: document.body.clientWidth,
      height: document.body.clientHeight
    }}>
      <div className={styles.lds_ellipsis}><div></div><div></div><div></div><div></div></div>
    </div>
  )
}