import Dialogue from "@/components/Dialogue";
import Sequential from "@/components/Sequential"
import TextBlock from "@/components/TextBlock"
import { answerBoxVisibilityState } from "@/globals/states";

import styles from "@/styles/Puzzle.module.css"
import { useSetRecoilState } from "recoil";

interface Props {
  puzzleId: number;
  currentPuzzle: number;
}

export default function Puzzle4({ puzzleId, currentPuzzle }: Props) {
  const setShowAnswerBox = useSetRecoilState(answerBoxVisibilityState)
  return (
    <>
      <div className={styles.container}>
        <Sequential onFinished={() => setShowAnswerBox(true)}>
          <TextBlock type="narration" message="Through Kobe’s hint, you discovered the place where the other cats are located. At the entrance of the place, you see a sign with weird writings on it." />
          <TextBlock type="instruction" message="(GO TO THE PLACE TO THE FIND THE ACTUAL SIGN.) " />
          <TextBlock type="narration" message="The door opened ajar and a cat whispered through the opening. " />
          <Dialogue sender="Mr. Cat" senderImage="/logo.svg"
            script={[
              { type: "send", message: "What’s the password? *meow*" },
              { type: "reply", message: "The password?" },
              { type: "send", message: "Do you not know what a password is? *meow*" },
              { type: "send", message: "If you do not know the password, I cannot let you in." },
              { type: "reply", message: "I— I know! It’s…" },
            ]} />
          <TextBlock type="instruction" message="Use the given information to figure out the password. Type your answer in the box below. Answers are not case-sensitive but don’t put extra spaces. " />
          <TextBlock type="instruction" message="[NOTE: You only have three tries for this puzzle. If you fail, you will have to wait for five minutes to try again.] " />
        </Sequential>
      </div>
    </>
  )
}
