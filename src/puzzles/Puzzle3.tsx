
import Dialogue from "@/components/Dialogue";
import Maze from "@/components/Maze";
import Show from "@/components/Show"
import Sequential from "@/components/Sequential"

import styles from "@/styles/Puzzle.module.css";
import TextBlock from "@/components/TextBlock";
import { useSetRecoilState } from "recoil";
import { answerBoxVisibilityState } from "@/globals/states";

interface Props {
  puzzleId: number;
  currentPuzzle: number;
}

export default function Puzzle3({ puzzleId, currentPuzzle }: Props) {

  const setShowAnswerBox = useSetRecoilState(answerBoxVisibilityState)

  return (
    <>
      <div className={styles.container}>
        <Sequential onFinished={() => setShowAnswerBox(true)}>
          <TextBlock type="narration" message="You successfully solved the puzzle and went to the second cat. It appeared to have been expecting you." />
          <Dialogue sender="Kobe" senderImage="/cats/2-kobe.png"
            script={[
              { type: "send", message: "Who do we have here? *meow*" },
              { type: "reply", message: "Hello, some cat told me that you might know a few things about this place." },
              { type: "send", message: "I know a lot of things. *meow*" },
              { type: "send", message: "But I never tell them directly." },
              { type: "send", message: "Since you were able to answer my note, I trust that you can also answer this riddle. *meow*" },
              { type: "image", message: "/clues/3.png" },
            ]}
          />
          <TextBlock type="instruction" message="Guess the answer to the riddle. Type your answer in the box below. Answers are not case-sensitive but don’t put extra spaces." />
        </Sequential>
      </div>
    </>
  )
}
