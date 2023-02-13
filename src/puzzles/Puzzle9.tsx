
import Dialogue from "@/components/Dialogue"
import Sequential from "@/components/Sequential"
import TextBlock from "@/components/TextBlock"
import { answerBoxVisibilityState } from "@/globals/states";
import styles from "@/styles/Puzzle.module.css"
import { useSetRecoilState } from "recoil";

interface Props {
  puzzleId: number;
  currentPuzzle: number;
}

export default function Puzzle9({ puzzleId, currentPuzzle }: Props) {

  const setShowAnswerBox = useSetRecoilState(answerBoxVisibilityState)
  return (
    <>
      <div className={styles.container}>
        <Sequential onFinished={() => setShowAnswerBox(true)}>
          <TextBlock type="narration" message="You find traces of fur around the area, and crumbs that clearly fell from the fried chicken. However, you cannot seem to get any more hints of who the perpetrators may be." />

          <Dialogue sender="Eve" senderImage="/cats/6-eve.png" script={[
            { type: "send", message: "Quite intriguing indeed, don’t you think? meow This fur, it is unmistakable. It belongs to Gray." },
            { type: "reply", message: "Oh, thanks! Didn’t think you’d go out of your way to help me." },
            { type: "send", message: "Do not think of yourself so highly, two-legged one. meow I simply wanted to see the sight for myself! One would never feel pity as to go out of my way to provide personal assistance. meow" },
            { type: "reply", message: "Alright, alright, thanks for the help, your greatness!" },
            { type: "send", message: "I did not do it to be thanked." }
          ]} />

          <TextBlock type="narration" message="You were already exhausted from investigating from cat to cat but you knew that you were close to completing all the puzzles! It was almost as if a voice was telling you that this was the second-to-the-last puzzle. You were determined to finish it at all costs! You pursued the cat named Gray." />

          <Dialogue sender="Gray" senderImage="/cats/7-gray.png" script={[
            { type: "send", message: "Ohh… hey, human. meow Wh-what exactly were you doing?" },
            { type: "reply", message: "I am desperate for any knowledge about the perpetrator." },
            { type: "send", message: "Let me get this straight. So you were chasing me not because you thought it was me but because you needed a hint? meow" },
            { type: "reply", message: "Well… yes?" },
            { type: "send", message: "Haha, yes! Of course! What was I thinking? meow So you want my help." },
            { type: "reply", message: "This exchange doesn’t have to be one-sided. I’ve already helped out some of your buddies in exchange for information." },
            { type: "send", message: "Alrighty then. I’ll confess something. meow I was at the scene of the crime and I saw this note. I don’t know if I should give it to you but I can’t understand it anyway." },
            { type: "send", message: "Here you go! Good luck!" },
          ]} />

          <TextBlock type="instruction" message="Decipher the text written in the note. Type your answer in the box below. Answers are not case-sensitive but don’t put extra spaces." />
        </Sequential>
      </div>
    </>
  )
}
