
import styles from "@/styles/Puzzle.module.css"

interface Props {
  puzzleId: number;
  currentPuzzle: number;
}

export default function Puzzle10({ puzzleId, currentPuzzle }: Props) {
  return (
    <>
      <div className={styles.container}>
      </div>
    </>
  )
}
