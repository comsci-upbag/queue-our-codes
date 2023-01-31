import styles from "@/styles/AlertBox.module.css"

interface AlertProps {
  title: string,
  message: string,
  type: "success" | "danger" | "warning" | "info",
  show: (x: boolean) => void
}

import { useRef } from "react"

export default function AlertBox({ title, message, type, show }: AlertProps) {
  const alertRef = useRef<HTMLDivElement>(null)

  const closeAlert = (e: React.MouseEvent) => {
    if (e.target == alertRef.current) return
    show(false)
  }

  return (
    <div className={styles.container} onClick={closeAlert} style={{
      width: document.body.clientWidth,
      height: document.body.clientHeight
    }}>
      <div ref={alertRef} className={`${styles.alert} ${styles.alert}-type`} role="alert">
        <div id="note">
          <p id={styles.notetitle}> {title} </p>
          <p id={styles.notemessg}> {message} </p>
        </div>
        <button type="button" className={styles.btnclose} data-bs-dismiss="alert" aria-label="Close" onClick={closeAlert}> × </button>
      </div>
    </div>
  )
}