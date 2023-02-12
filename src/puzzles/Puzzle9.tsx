
import Dialogue from "@/components/Dialogue"
import styles from "@/styles/Puzzle.module.css"

interface Props {
  puzzleId: number;
  currentPuzzle: number;
}

export default function Puzzle9({ puzzleId, currentPuzzle }: Props) {
  return (
    <>
      <div className={styles.container}>
        <Dialogue sender="Mr. Cat" senderImage="/logo.svg" script={[
          { type: "send", message: "Ohh… hey, human. meow Wh-what exactly were you doing?" },
          { type: "reply", message: "I am desperate for any knowledge about the perpetrator." },
          { type: "send", message: "Let me get this straight. So you were chasing me not because you thought it was me but because you needed a hint? meow" },
          { type: "reply", message: "Well… yes?" },
          { type: "send", message: "Haha, yes! Of course! What was I thinking? meow So you want my help." },
          { type: "reply", message: "This exchange doesn’t have to be one-sided. I’ve already helped out some of your buddies in exchange for information." },
          { type: "send", message: "Alrighty then. I’ll confess something. meow I was at the scene of the crime and I saw this note. I don’t know if I should give it to you but I can’t understand it anyway." },
          { type: "send", message: "Here you go! Good luck!" },
        ]}
        />
      </div>
    </>
  )
}
