
import Dialogue from "@/components/Dialogue"

import styles from "@/styles/Puzzle.module.css"

import Sequential from "@/components/Sequential";
import Crossword from "@/components/Crossword";
import TextBlock from "@/components/TextBlock";

interface Props {
  puzzleId: number;
  currentPuzzle: number;
}

export default function Puzzle7({ puzzleId, currentPuzzle }: Props) {
  return (
    <>
      <div className={styles.container}>
        <Sequential>
          <TextBlock type="narration" message="You didn’t know what to do with “BUTTERNUT” so you tried asking around. You approached the nearest cat to ask whether or not they knew anything about it." />
          <Dialogue sender="Mr. Cat 1" senderImage="/logo.svg" script={[
            { type: "send", message: "Excuse me, do you happen to know about Butternut?" },
            { type: "send", message: "Butternut? What butternut? *meow* OH. Oh yes, I am Butternut, but as you can see, I’m quite busy right meow." },
            { type: "reply", message: "Umm, how about I help you with what you’re working on and in return, you’ll give me information about something I’m trying to find. Deal?" },
            { type: "send", message: "Well, if you insist, I guess I can work with that. *meow*" },
            { type: "send", message: "So I’ve been trying to learn human words and slang for quite some time now." },
            { type: "send", message: "I’m trying to do so through crossword-like puzzles. *meow*" },
            { type: "send", message: "It was going well but I got stuck with this specific item. Solving the following riddles reveals a 4-letter word as a final answer." },
            { type: "send", message: "Solving the following riddles reveals a 4-letter word as a final answer." },
          ]} />

          <Crossword />
        </Sequential>
      </div>
    </>
  )
}
