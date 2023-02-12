
import Dialogue from "@/components/Dialogue"
import styles from "@/styles/Puzzle.module.css"

interface Props {
  puzzleId: number;
  currentPuzzle: number;
}

export default function Puzzle5({ puzzleId, currentPuzzle }: Props) {
  return (
    <>
      <div className={styles.container}>
        <Dialogue sender="Mr. Cat" senderImage="/logo.svg"
          script={[
            { type: "send", message: "Meow knows what you want. meow One of my friends did something, didn’t they?" },
            { type: "reply", message: "I don't know how you knew that but if you could give me something I'll gladly accept it." },
            { type: "send", message: "Meow will make this simple for you. meow Meow has been observing you for quite some time and meow noticed that you weren't really listening to my fellow cats." },
            { type: "reply", message: "That's not true! I've been very respectful to all of them." },
            { type: "send", message: "Is that so? Well then, all you have to do is click this yarn as many times as you've heard any of us meow. meow" },
            { type: "send", message: "If you get it wrong, I’ll have you repeat everything. If you get it right, then meow will lead you to my friend immediately. meow" },
          ]} />
      </div>
    </>
  )
}
