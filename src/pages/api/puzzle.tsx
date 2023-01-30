import { useState } from "react";

import WebCam from "../../components/WebCam"
import styles from "../../styles/Home.module.css";

interface Props {
  puzzleId: number;
  currentPuzzle: number;
}

function Puzzle({ puzzleId, currentPuzzle }: Props) {

  const [prediction, setPrediction] = useState<string | null>(null);
  const [probability, setProbability] = useState<number | null>(null);

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
          {
            currentPuzzle === puzzleId ?
              <WebCam setPrediction={setPrediction} setProbability={setProbability} />
              :
              <>
                <WebCam setPrediction={setPrediction} setProbability={setProbability} /></>
          }
          {probability && <p>You are showing a {prediction} with a {((probability * 100).toFixed(2))}% confidence on our side!</p>}
          {prediction === "white-cat-yellow-head" && probability! > 0.5 && <p>You got it! The answer is all yours!</p>}
        </span>
      </>
    )
  }

  return (
    <></>
  )

}

export default Puzzle;
