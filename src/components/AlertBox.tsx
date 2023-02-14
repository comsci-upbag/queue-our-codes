import styles from "@/styles/AlertBox.module.css"
import { useRef } from "react"

interface AlertProps {
  title: string,
  message: string,
  type: "success" | "danger" | "warning" | "info",
  show: (x: boolean) => void,
  showWhen: boolean | null,
  callbackWhenClosed?: () => void,
}


export default function AlertBox({ title, message, type, show, showWhen, callbackWhenClosed }: AlertProps) {

  if (!showWhen)
    return <></>

  const alertRef = useRef<HTMLDivElement>(null)

  const closeAlert = (e: React.MouseEvent) => {
    if (e.target == alertRef.current) return
    if (callbackWhenClosed) callbackWhenClosed()
    show(false)
  }

  return (
    <div onClick={closeAlert} className={styles.container}>
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
