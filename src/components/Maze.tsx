import { useEffect, useState } from "react"
import AlertBox from "./AlertBox"


import styles from "@/styles/Maze.module.css"
import { answerBoxVisibilityState } from "@/globals/states"
import { useSetRecoilState } from "recoil"

// 3d array of the maze
const maze = [
  [
    ['█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█'],
    ['😺', '🪜', '█', 'Z', 'W', 'V', 'H', 'K', '█', '🪜', 'D', '🪜', '█', '🪜', '█', 'R', 'N', '🪜', '█', 'O', '█'],
    ['█', 'Y', '█', '█', '█', 'C', '█', 'L', '█', '█', '█', '█', '█', 'H', '█', 'K', '█', '█', '█', 'M', '█'],
    ['█', '🪜', 'A', '🪜', '█', 'V', '█', 'S', '█', 'W', 'K', 'P', '█', 'O', 'R', 'S', '█', '🪜', '█', 'T', '█'],
    ['█', '█', '█', '█', '█', 'W', '█', '█', '█', '█', '█', 'B', '█', 'W', '█', '█', '█', '█', '█', 'X', '█'],
    ['█', '🪜', 'M', '🪜', '█', '🪜', '█', '🪜', '█', 'E', 'R', '🪜', '█', 'Y', 'P', 'D', 'S', 'T', 'S', 'A', '█'],
    ['█', '█', '█', 'H', '█', '█', '█', 'L', '█', 'P', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█'],
    ['█', '🪜', 'A', 'J', '█', 'B', '█', 'T', '█', 'W', '█', 'D', '█', 'R', 'K', 'P', '█', 'Q', 'U', 'H', '█'],
    ['█', '█', '█', '█', '█', 'W', '█', 'J', '█', 'H', '█', 'O', '█', 'D', '█', '█', '█', 'D', '█', 'O', '█'],
    ['█', 'X', 'G', 'V', 'T', 'E', 'T', 'I', '█', 'S', 'V', 'J', 'G', 'H', 'J', 'O', 'U', 'W', '█', 'E', '█'],
    ['█', 'A', '█', '█', '█', 'V', '█', 'X', '█', '█', '█', 'S', '█', '█', '█', '█', '█', '█', '█', '█', '█'],
    ['█', 'Q', '█', 'L', '█', '🪜', '█', 'E', 'J', 'K', 'L', 'M', '█', '🪜', '█', '🪜', '█', '🪜', '█', '🪜', '█'],
    ['█', '█', '█', 'S', '█', '█', '█', 'S', '█', '█', '█', '█', '█', '█', '█', '█', '█', 'W', '█', 'X', '█'],
    ['█', '🪜', 'T', '🪜', '█', '🪜', '█', 'R', 'F', 'Z', 'P', '🪜', 'N', '🪜', 'Z', '🪜', '█', '🪜', '█', '🪜', '█'],
    ['█', 'Y', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█'],
    ['█', '🪜', '█', '🪜', 'Z', 'L', 'L', '🪜', '█', 'C', 'M', '🪜', '█', 'N', 'W', 'I', 'H', 'G', '█', 'D', '█'],
    ['█', '█', '█', '█', '█', '█', '█', 'C', '█', '█', '█', 'M', '█', 'B', '█', '█', '█', '█', '█', 'S', '█'],
    ['█', 'F', 'P', 'U', 'R', 'V', 'Z', 'J', '█', '🪜', '█', 'E', '█', 'I', '█', 'Z', 'U', 'R', 'E', 'A', '█'],
    ['█', 'C', '█', 'N', '█', 'Q', '█', '█', '█', '█', '█', 'I', '█', 'W', '█', '█', '█', '█', '█', 'T', '█'],
    ['█', 'N', '█', '🪜', '█', 'C', 'P', 'J', 'S', 'F', '█', 'S', '█', '🪜', '█', '🪜', 'R', '🪜', '█', '🪜', '█'],
    ['█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█'],
  ],
  [
    ['█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█'],
    ['█', '🪜', '█', 'L', 'J', 'N', '█', 'Q', 'T', '🪜', '█', '🪜', 'X', '🪜', '█', 'M', '█', '🪜', 'D', 'R', '█'],
    ['█', '█', '█', '█', '█', 'K', '█', 'O', '█', '█', '█', '█', '█', '█', '█', 'W', '█', '█', '█', '█', '█'],
    ['█', '🪜', '█', '🪜', 'B', 'F', '█', 'C', 'S', 'R', 'G', 'L', '█', 'D', '█', 'J', 'Z', '🪜', '█', 'M', '█'],
    ['█', 'B', '█', '█', '█', '█', '█', '█', '█', '█', '█', 'C', '█', 'N', '█', '█', '█', 'I', '█', 'P', '█'],
    ['█', '🪜', 'U', '🪜', 'Z', '🪜', 'T', '🪜', 'X', 'R', '█', '🪜', 'U', 'A', '█', 'D', 'G', 'Q', 'L', 'G', '█'],
    ['█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', 'K', '█', '█', '█'],
    ['█', '🪜', 'Y', 'F', 'I', 'T', 'Z', 'N', '█', 'W', '█', 'P', '█', 'Q', 'E', 'A', '█', 'H', 'M', 'R', '█'],
    ['█', '█', '█', 'D', '█', '█', '█', 'O', '█', 'B', '█', 'Y', '█', 'T', '█', '█', '█', 'X', '█', '█', '█'],
    ['█', 'Q', 'W', 'Z', 'N', 'C', '█', 'V', '█', 'N', '█', 'I', '█', 'K', 'J', 'H', 'Y', 'U', '█', 'P', '█'],
    ['█', 'F', '█', 'O', '█', '█', '█', '█', '█', 'X', '█', 'Y', '█', '█', '█', 'Z', '█', '█', '█', 'W', '█'],
    ['█', 'N', '█', 'A', '█', '🪜', '█', 'E', 'Q', 'Q', 'A', 'L', 'E', '🪜', 'F', '🪜', '█', '🪜', 'T', '🪜', '█'],
    ['█', '█', '█', 'G', '█', 'B', '█', 'S', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█'],
    ['█', '🪜', '█', '🪜', '█', '🪜', '█', 'T', '█', 'W', 'S', '🪜', '█', '🪜', '█', '🪜', 'R', '🪜', '█', '🪜', '█'],
    ['█', '█', '█', 'V', '█', 'W', '█', '█', '█', '█', '█', '█', '█', 'C', '█', 'U', '█', '█', '█', 'Z', '█'],
    ['█', '🪜', '█', '🪜', '█', 'H', '█', '🪜', 'I', 'O', '█', '🪜', '█', 'P', '█', 'O', 'T', 'R', '█', 'X', '█'],
    ['█', '█', '█', '█', '█', 'P', '█', '█', '█', '█', '█', 'O', '█', '█', '█', 'S', '█', '█', '█', 'B', '█'],
    ['█', 'Q', 'E', 'R', '█', 'M', 'A', 'D', 'Y', '🪜', 'T', 'P', '█', 'V', 'T', 'A', '█', 'U', 'S', 'V', '█'],
    ['█', 'T', '█', '█', '█', '█', '█', 'N', '█', '█', '█', '█', '█', 'D', '█', '█', '█', '█', '█', '█', '█'],
    ['█', 'Y', 'V', '🪜', 'E', 'R', '█', 'P', 'X', 'Y', '█', 'Z', 'M', '🪜', 'O', '🪜', '█', '🪜', 'A', '🪜', '😼'],
    ['█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█', '█'],
  ],
]

let visited: string[] = ['0-1-0']

export default function Maze() {

  const setShowAnswerBox = useSetRecoilState(answerBoxVisibilityState)
  const [startGame, setStartGame] = useState(false)
  const [x, setX] = useState(0)
  const [y, setY] = useState(1)
  const [z, setZ] = useState(0)
  const [isPlayerAtEnd, setIsPlayerAtEnd] = useState(false)

  function Controls() {
    return <>
      <div className={styles.Controls}>
        <span />
        <button onClick={() => {
          if ((y - 1) >= 0 && maze[z][y - 1][x] !== '█') {
            setY(y - 1);
            visited.push(z + "-" + y + "-" + x)
          }
        }}>🔼</button>
        <span />
        <button onClick={() => {
          if ((x - 1) >= 0 && maze[z][y][x - 1] !== '█') {
            setX(x - 1)
            visited.push(z + "-" + y + "-" + x)
          }
        }}>◀️</button>
        <button onClick={() => {
          if (maze[z][y][x] === '🪜') {
            z === 0 ? setZ(1) : setZ(0)
            visited.push(z + "-" + y + "-" + x)
          }
        }}>⭕️</button>
        <button onClick={() => {
          if ((x + 1) < maze[z][y].length && maze[z][y][x + 1] !== '█') {
            setX(x + 1)
            visited.push(z + "-" + y + "-" + x)
          }
        }}>▶️</button>
        <span />
        <button onClick={() => {
          if ((y + 1) < maze[z].length && maze[z][y + 1][x] !== '█') {
            setY(y + 1)
            visited.push(z + "-" + y + "-" + x)
          }
        }}>🔽</button>
        <span />
      </div>
    </>
  }

  useEffect(() => {
    for (let i = 0; i < visited.length; i++) {
      document.getElementById(visited[i])?.classList.add(styles.Visited)
    }
    if (maze[z][y][x] === '😼') {
      setIsPlayerAtEnd(true)
    }
  }, [x, y, z])

  useEffect(() => {
    if (isPlayerAtEnd) {
      setShowAnswerBox(true)
    }
  }, [isPlayerAtEnd])

  return <div className={styles.Container}>
    <AlertBox showWhen={isPlayerAtEnd} title={"You've reached the end!"} message={"Now that you've reached the end, keep it at your prime as you are now on your own."} type="info" show={setIsPlayerAtEnd} />

    {startGame ? <>
      <div className={styles.MazeContainer} key={String(z + " ")}>
        {maze[z].map((row, i) => {
          return <div key={String(z + " " + i)} className={styles.Maze}>
            {row.map((cell, j) => {
              if (i === y && j === x) {
                return <div id={z + "-" + i + "-" + j} key={j} className={styles.Visited}>👤</div>
              }
              if (cell === '█') {
                return <div key={j} style={{
                  background: 'black',
                  width: "100%",
                }}></div>
              }
              return <div key={String(z + " " + i + " " + j)} id={z + "-" + i + "-" + j}>{cell}</div>
            })}
          </div>
        })}
      </div>
      <Controls />
    </> : <>
      <button className={styles.StartButton} onClick={() => setStartGame(true)}>Start Maze</button>
    </>
    }
  </div>
}
