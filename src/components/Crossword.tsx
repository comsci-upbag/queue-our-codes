import { answerBoxVisibilityState } from "@/globals/states";

import { useState } from "react";
import { useSetRecoilState } from "recoil";
import ReactCrossword from "@jaredreisinger/react-crossword"

import styles from "@/styles/Crossword.module.css"

const data = {
  across: {
    1: {
      clue: 'Solve the other puzzles to find me.',
      answer: 'SIKE',
      row: 7,
      col: 5,
    }
  },
  down: {
    1: {
      clue: 'I disappear as you say my name.',
      answer: 'SILENCE',
      row: 7,
      col: 5,
    },
    2: {
      clue: 'Iron + ⎯⎯⎯',
      answer: 'FELINE',
      row: 4,
      col: 6,
    },
    3: {
      clue: 'They eat me, then they get eaten.',
      answer: 'FISHHOOK',
      row: 0,
      col: 7,
    },
    4: {
      clue: 'Cats, well even dogs, chase me even though they can’t touch me.',
      answer: 'LASER',
      row: 4,
      col: 8,
    },
  },
};

export default function Crossword() {
  const [startGame, setStartGame] = useState(false);
  const setShowAnswerBox = useSetRecoilState(answerBoxVisibilityState)

  return (
    <>
      <div className={styles.container}>
        {startGame ?
          <>
            <div style={{
              display: "flex",
              flexDirection: "column",
              justifyItems: "center",
              alignItems: "center"
            }}>
              <div style={{ width: "fit-content" }}>
                <ReactCrossword data={data} onCrosswordCorrect={() => setShowAnswerBox(true)} theme={{ highlightBackground: 'var(--shadow-color1)' }} />
              </div>
            </div>
          </>
          :
          <>
            <button onClick={() => setStartGame(true)}>Start Crossword</button>
          </>
        }
      </div>
    </>
  )
}