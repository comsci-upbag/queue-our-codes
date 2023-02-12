import styles from "@/styles/Crossword.module.css"

import { useState } from "react";

const puzzle = [
  ['█', '█', '█', '█', '█', '█',],
  ['█', '█', '█', '█', '█', '█',],
]


export default function Crossword() {
  const [startGame, setStartGame] = useState(false);
  return (
    <>
      <div className={styles.container}>
        {startGame ?
          <>
          </>
          :
          <>
            <button className={styles.StartButton} onClick={() => setStartGame(true)}>Start Crossword</button>
          </>
        }
      </div>
    </>
  )
}