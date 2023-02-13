
import Dialogue from "@/components/Dialogue"
import Sequential from "@/components/Sequential";
import TapGame from "@/components/TapGame";
import TextBlock from "@/components/TextBlock";
import { answerBoxVisibilityState } from "@/globals/states";
import styles from "@/styles/Puzzle.module.css"
import { useSetRecoilState } from "recoil";

interface Props {
  puzzleId: number;
  currentPuzzle: number;
}

export default function Puzzle5({ puzzleId, currentPuzzle }: Props) {

  const setShowAnswerBox = useSetRecoilState(answerBoxVisibilityState)
  return (
    <>
      <div className={styles.container}>
        <Sequential onFinished={() => setShowAnswerBox(true)}>
          <div style={{
            height: "100px",
          }}>
            <Dialogue sender="Anonymous Cat" senderImage="/cats/3-hidden-cat.png"
              script={[
                { type: "send", message: "I see you are a cat friend. You may come in now." },
              ]} />
          </div>
          <TextBlock type="narration" message="You decided to ask around the place. There were a few cats lying around, some of them were playing while others were simply minding their own business. You were already making significant progress in your investigation and you were already halfway there! One cat was staring at you and inviting you to come near." />
          <Dialogue sender="Mumshie" senderImage="/cats/4-mumshie.png"
            script={[
              { type: "send", message: "Meow knows what you want. *meow*" },
              { type: "send", message: "One of my friends did something, didn’t they?" },
              { type: "reply", message: "I don't know how you knew that but if you could give me something I'll gladly accept it." },
              { type: "send", message: "Meow will make this simple for you. *meow* " },
              { type: "send", message: "Meow has been observing you for quite some time and meow noticed that you weren't really listening to my fellow cats." },
              { type: "reply", message: "That's not true!" },
              { type: "reply", message: "I've been very respectful to all of them." },
              { type: "send", message: "Is that so?" },
              { type: "send", message: "Well then, all you have to do is click this yarn as many times as you've heard any of us meow. *meow*" },
              { type: "send", message: "If you get it wrong, I’ll have you repeat everything." },
              { type: "send", message: "If you get it right, then meow will lead you to my friend immediately. *meow*" },
            ]} />
          <TextBlock type="instruction" message="Click the ball icon the correct number of times. If you give the wrong answer, you will have to restart your investigation." />
          <TextBlock type="instruction" message="[NOTE: You only have two tries for this puzzle.]" />
          <TapGame />
        </Sequential>
      </div>
    </>
  )
}
