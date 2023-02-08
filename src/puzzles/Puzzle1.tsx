
import styles from "@/styles/Home.module.css";

interface Props {
  puzzleId: number;
  currentPuzzle: number;
}

export default function Puzzle1(_ : Props) {
  return (
    <>
      <span id={styles.cluecont}>
        To use me, break me <br /><br />
        I am in front, but you can’t see me <br /><br />
        By the Laws of Physics, what goes up but never goes down? <br /><br />
        I get bigger the more is taken away
      </span>
    </>
  )
}
