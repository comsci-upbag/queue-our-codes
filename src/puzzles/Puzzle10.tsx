
import Sequential from "@/components/Sequential";
import TextBlock from "@/components/TextBlock";
import styles from "@/styles/Puzzle.module.css"

interface Props {
  puzzleId: number;
  currentPuzzle: number;
}

export default function Puzzle10({ puzzleId, currentPuzzle }: Props) {
  return (
    <>
      <div className={styles.container}>
        <Sequential>
          <TextBlock type="narration" message="From the note left on the scene, you learned that the perpetrator had no intentions of hiding their identity. They simply did not want to be discovered immediately lest they get judged by the other cats. This was the final piece that you needed in order to solve the fried chicken mystery!" />
          <TextBlock type="instruction" message="Use all of the previous hints to find the perpetrator. Everything happened for a reason! Type in your final answer and once you have completed this task, you may claim your reward in the Chi Sigma Booth. Answers to all the questions will also be verified in order to ensure that the participants did not cheat in any form." />
        </Sequential>
      </div>
    </>
  )
}
