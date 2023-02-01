import { useState } from "react";

import WebCam from "../../components/WebCam"
import styles from "../../styles/Home.module.css";

interface Props {
  puzzleId: number;
  currentPuzzle: number;
}

function Puzzle({ puzzleId, currentPuzzle }: Props) {

  if (puzzleId == 1) {
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

  if (puzzleId == 2) {
    return (
      <>
        <span id={styles.cluecont}>
          Keep your eyes open, and you will see... <br /><br />
          {currentPuzzle === puzzleId && <WebCam />}
        </span>
      </>
    )
  }

  return (
    <></>
  )

}

export default Puzzle;
