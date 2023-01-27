
import styles from "../../styles/Home.module.css";

function Puzzle( { puzzleId } : {puzzleId: number} ) {

  if (puzzleId == 1)
    return (
      <>
        <span id={styles.cluenum}> Clue #{puzzleId} </span>
        <span id={styles.cluecont}>
          To use me, break me <br /><br />
          I am in front, but you can’t see me <br /><br />
          By the Laws of Physics, what goes up but never goes down? <br /><br />
          I get bigger the more is taken away
        </span>
      </>
    )

  return (
    <></>
  )

}

export default Puzzle;
