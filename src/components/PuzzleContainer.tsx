import Puzzle from "@/pages/api/puzzle"
import styles from "@/styles/Home.module.css"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"

import AlertBox from "@/components/AlertBox"

interface props {
  currentPuzzle: number,
  previousAnswers: string[],
}

export default function PuzzleContainer({currentPuzzle, previousAnswers }: props) {

  const inputField = useRef<HTMLInputElement>(null);
  const puzzlesContainer = useRef<HTMLDivElement>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [visiblePuzzle, setVisiblePuzzle] = useState<number>(currentPuzzle);

  const handleSubmitAnswer = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const request = {
      answer: inputField.current!.value
    };

    fetch("/api/validateAnswer", {
      method: "POST",
      body: JSON.stringify(request),
    }).then(data => data.json())
      .then(data => data.isAnswerCorrect)
      .then(isAnswerCorrect => {
        // TODO: handle popup
        if (isAnswerCorrect) {
          window.location.reload();
        } else {
          setShowAlert(true);
        }
      })
  }

  useEffect(() => {
    puzzlesContainer.current!.scrollTo(puzzlesContainer.current!.scrollWidth, 0);
  }, [])

  return (
    <>
      <AlertBox showWhen={showAlert} title="Wrong Answer" message="Please try again" type="danger" show={setShowAlert} />
      <div ref={puzzlesContainer}>
        <div className={styles.PuzzleCard} key={visiblePuzzle}>
          <div className={styles.HomeContainer} id={styles.ClueContainer}>
            <span id={styles.cluenum}> Clue #{visiblePuzzle} </span>
            <Puzzle puzzleId={visiblePuzzle} currentPuzzle={currentPuzzle} />
          </div>
          {
            visiblePuzzle === currentPuzzle
              ?
              <div className={styles.HomeContainer} id={styles.InputContainer}>
                <input ref={inputField} id={styles.InputField} type="text" placeholder="Answer" />
                <Image id={styles.SubmitButtonImage} src="submit.svg" alt="Picture of the user" width={25} height={25} onClick={handleSubmitAnswer} />
              </div>
              :
              <div className={styles.HomeContainer} id={styles.InputContainer}>
                <input id={styles.InputField} type="text" placeholder={`Answer for #${visiblePuzzle} is ${previousAnswers[visiblePuzzle - 1]}`} disabled />
              </div>
          }
        </div>
      </div>
      <div id={styles.NavigationContainer}>
        <button onClick={() => setVisiblePuzzle(visiblePuzzle - 1)} disabled={visiblePuzzle === 1}> &lt; PREV </button>
        <button onClick={() => setVisiblePuzzle(visiblePuzzle + 1)} disabled={visiblePuzzle === currentPuzzle}> NEXT &gt; </button>
      </div>
      <div className={styles.ProgressBar}>
        <div className={styles.Progress} style={{ width: `calc((${currentPuzzle}/ 10) * 100% - 4px)` }}></div >
      </div>
    </>
  )

}
