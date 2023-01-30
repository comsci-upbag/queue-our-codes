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
    if (e.target != alertRef.current) return
    show(false)
  }

  return (
    <div ref={alertRef} className={`${styles.alert} ${styles.alert}-type`} role="alert" onClick={closeAlert}>
      <div>
        <h1>{title}</h1>
        <p>{message}</p>
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={closeAlert}></button>
      </div>
    </div>
  )
}