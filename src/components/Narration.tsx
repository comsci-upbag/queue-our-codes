
import styles from "@/styles/Narration.module.css"
import { TypeAnimation } from "react-type-animation"

interface Props {
  script: string[]
}

export function Narration({ script } : Props) {
  return (
    <div id={styles.cluecont}>
      {script.map(line => <TypeAnimation sequence={[2000, line]} wrapper="p"/> )}
    </div>
  )
}
