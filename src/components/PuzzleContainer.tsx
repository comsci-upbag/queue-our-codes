import Puzzle from "@/pages/api/puzzle"
import styles from "@/styles/Home.module.css"
import { useState, useRef, useEffect } from "react"
import AnswerBox from "@/components/AnswerBox"

import AlertBox from "@/components/AlertBox"
import { useSetRecoilState } from "recoil"
import { visibilePuzzleState } from "@/globals/states"

interface props {
  currentPuzzle: number,
  previousAnswers: string[],
}

export default function PuzzleContainer({ currentPuzzle, previousAnswers }: props) {

  const puzzlesContainer = useRef<HTMLDivElement>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [visiblePuzzle, setVisiblePuzzle] = useState<number>(currentPuzzle);

  const setIsFinished = useSetRecoilState(visibilePuzzleState)

  useEffect(() => {
    setIsFinished(currentPuzzle !== visiblePuzzle)
    puzzlesContainer.current!.scrollTo(puzzlesContainer.current!.scrollWidth, 0);
  }, [visiblePuzzle])

  return (
    <>
      <AlertBox showWhen={showAlert} title="Wrong Answer" message="Please try again" type="danger" show={setShowAlert} />
      <div ref={puzzlesContainer}>
        <div className={styles.PuzzleCard} key={visiblePuzzle}>
          <div className={styles.HomeContainer} id={styles.ClueContainer}>
            <span id={styles.cluenum}> Clue #{visiblePuzzle} </span>
            <Puzzle puzzleId={visiblePuzzle} currentPuzzle={currentPuzzle} />
          </div>
          <AnswerBox isAnswered={currentPuzzle !== visiblePuzzle} puzzleId={visiblePuzzle} answer={previousAnswers[visiblePuzzle - 1]} />
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
