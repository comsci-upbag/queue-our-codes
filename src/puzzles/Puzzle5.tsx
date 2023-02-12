
import Dialogue from "@/components/Dialogue"
import TextBlock from "@/components/TextBlock";
import styles from "@/styles/Puzzle.module.css"

interface Props {
  puzzleId: number;
  currentPuzzle: number;
}

export default function Puzzle5({ puzzleId, currentPuzzle }: Props) {
  return (
    <>
      <div className={styles.container}>
        <TextBlock type="narration" message="You decided to ask around the place. There were a few cats lying around, some of them were playing while others were simply minding their own business. You were already making significant progress in your investigation and you were already halfway there! One cat was staring at you and inviting you to come near." />
        <Dialogue sender="Mr. Cat" senderImage="/logo.svg"
          script={[
            { type: "send", message: "Meow knows what you want. meow One of my friends did something, didn’t they?" },
            { type: "reply", message: "I don't know how you knew that but if you could give me something I'll gladly accept it." },
            { type: "send", message: "Meow will make this simple for you. meow Meow has been observing you for quite some time and meow noticed that you weren't really listening to my fellow cats." },
            { type: "reply", message: "That's not true! I've been very respectful to all of them." },
            { type: "send", message: "Is that so? Well then, all you have to do is click this yarn as many times as you've heard any of us meow. meow" },
            { type: "send", message: "If you get it wrong, I’ll have you repeat everything. If you get it right, then meow will lead you to my friend immediately. meow" },
          ]} />
        <TextBlock type="instruction" message="Click the ball icon the correct number of times (13). If you give the wrong answer, you will have to restart your investigation."/>
        <TextBlock type="instruction" message="[NOTE: You only have two tries for this puzzle.]"/>
      </div>
    </>
  )
}
