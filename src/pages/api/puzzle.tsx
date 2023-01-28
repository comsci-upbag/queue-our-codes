import { useState } from "react";

import WebCam from "../../components/webcam-tflite"

import styles from "../../styles/Home.module.css";

function Puzzle({ puzzleId }: { puzzleId: number }) {

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
          <WebCam URL="https://teachablemachine.withgoogle.com/models/w2FwPYeyg/" setPrediction={setPrediction} setProbability={setProbability} />
          {(probability) ? <p>You are showing a {prediction} with a {((probability * 100).toFixed(2))}% confidence on our side!</p> : <></>}
          {prediction === "white-cat-yellow-head" && probability! > 0.5 ? "You got it! The answer is all yours!" : ""}
        </span>

        <div className={styles.PredictionBar}>
          <div className={styles.Prediction} style={{ width: `calc((${prediction === "white-cat-yellow-head" ? probability : 0}) * 100% - 4px)` }}></div >
        </div>
      </>
    )
  }

  return (
    <></>
  )

}

export default Puzzle;
