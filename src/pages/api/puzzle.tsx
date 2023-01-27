import { useState } from "react";

import WebCam from "../../components/webcam"

import styles from "../../styles/Home.module.css";

function Puzzle({ puzzleId }: { puzzleId: number }) {

  const [prediction, setPrediction] = useState<string | null>(null);
  const [probability, setProbability] = useState<number | null>(null);

  if (puzzleId == 1) {
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
  }

  if (puzzleId == 2) {
    return (
      <>
        <span id={styles.cluecont}>
          Keep your eyes open, and you will see... <br /><br />
          <WebCam URL="https://teachablemachine.withgoogle.com/models/QJqiovVqX/" setPrediction={setPrediction} setProbability={setProbability} />
          {prediction === "open-mouth" && probability! > 0.8 ? "You got it! The answer is all yours!" : ""}
        </span>

        <div className={styles.PredictionBar}>
          <div className={styles.Prediction} style={{ width: `calc((${prediction === "open-mouth" ? probability : 0}) * 100% - 4px)` }}></div >
        </div>
      </>
    )
  }

  return (
    <></>
  )

}

export default Puzzle;
