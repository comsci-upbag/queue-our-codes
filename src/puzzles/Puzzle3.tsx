
import Dialogue from "@/components/Dialogue";
import Maze from "@/components/Maze";
import Show from "@/components/Show"
import Sequential from "@/components/Sequential"

import styles from "@/styles/Puzzle.module.css";
import TextBlock from "@/components/TextBlock";

interface Props {
  puzzleId: number;
  currentPuzzle: number;
}

export default function Puzzle3({ puzzleId, currentPuzzle }: Props) {
  return (
    <>
      <div className={styles.container}>
        <Sequential>
          <TextBlock type="instruction" message="You successfully solved the puzzle and went to the second cat. It appeared to have been expecting you." />
          <Dialogue sender="Mr. Cat" senderImage="/logo.svg" 
            script={[
              { type: "send", message: "meow Who do we have here?" },
              { type: "reply", message: "Hello, some cat told me that you might know a few things about this place." },
              { type: "send", message: "I know a lot of things. meow But I never tell them directly. Since you were able to answer my note, I trust that you can also answer this riddle. meow" },
            ]}
            />
          <TextBlock type="instruction" message="Guess the answer to the riddle. Type your answer in the box below. Answers are not case-sensitive but don’t put extra spaces." />
        </Sequential>
      </div>
    </>
  )
}
