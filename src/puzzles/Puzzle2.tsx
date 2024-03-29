import styles from "@/styles/Puzzle.module.css"
import Dialogue from "@/components/Dialogue"
import Sequential from "@/components/Sequential"
import TextBlock from "@/components/TextBlock";
import { useSetRecoilState } from "recoil";
import { answerBoxVisibilityState } from "@/globals/states";

interface Props {
  puzzleId: number;
  currentPuzzle: number;
}

export default function Puzzle2({ puzzleId, currentPuzzle }: Props) {

  const setShowAnswerBox = useSetRecoilState(answerBoxVisibilityState)

  return (
    <div className={styles.container}>
      <Sequential onFinished={() => setShowAnswerBox(true)}>
        <TextBlock
          message="You finally found the first cat! The cat is currently resting but 
          since this is a very urgent matter, you decided to wake them up. 
          They seemed very grumpy because of what you did."
          type="narration"
        />
        <Dialogue sender="Mcat" senderImage="/cats/1-mcat.png" script={[
          { type: "send", message: "Why are you here? *meow*" },
          { type: "send", message: "Why are people disturbing my sleep? *meow*" },
          { type: "reply", message: "Hello, can I ask why were you around this place?" },
          { type: "reply", message: "What were you doing here?" },
          { type: "send", message: "Why do you care? *meow* I go everywhere, this place is nothing special to me." },
          { type: "reply", message: "I am investigating what happened here in this place." },
          { type: "reply", message: "Right now, you’re the only cat we know who has been here." },
          { type: "send", message: "Meowkay. *meow* How do I prove my innocence?" },
          { type: "send", message: "I’m not going to tell you other cats’ secrets, but I know some shady cat who might. *meow* You can reach them through this note:" },
          { type: "image", message: "/clues/2.png" },
        ]} />

        <TextBlock type="instruction" message="Decipher the text written in the note. Type your answer in the box below. Answers are not case-sensitive but don’t put extra spaces." />
      </Sequential>
    </div>
  )
}
