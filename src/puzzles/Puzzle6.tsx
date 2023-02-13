
import Dialogue from "@/components/Dialogue";
import Maze from "@/components/Maze";
import TextBlock from "@/components/TextBlock"
import Sequential from "@/components/Sequential"

import styles from "@/styles/Puzzle.module.css";

interface Props {
  puzzleId: number;
  currentPuzzle: number;
}

export default function Puzzle6({ puzzleId, currentPuzzle }: Props) {


  return (
    <>
      <div className={styles.container}>
        <Sequential>
          <TextBlock type="narration" message="Mumshie told her friend about you and the new cat understood it immediately. After Mumshie fulfilled her promise, she promptly left and let her friend take over." />
          <Dialogue sender="Quatro" senderImage="/cats/5-quatro.png"
            script={[
              { type: "send", message: "Ey yo, it’s Quatro! What’s good, chief?" },
              { type: "send", message: "Meow on the street is some kitten on the prowl for a dirty chicken crook." },
              { type: "send", message: "Can’t have no filthy fowl filcher messing up good cats’ rep, so I’ll be rootin’ for you. *meow*" },
              { type: "reply", message: "Do you know who the thief is?" },
              { type: "reply", message: "Wait, how did you know about the chi— " },
              { type: "send", message: "Nah, but I do not who the thief is though I may just know who does... but I ain’t no squealer! *meow*" },
              { type: "send", message: "You gon’ have to work for it..." },
              { type: "send", message: "I got my paws on this here maze, hint hint." },
              { type: "reply", message: "So... I solve this then you’ll tell me?" },
              { type: "send", message: "Nah! I already gave you the goods, homie. *meow*" },
              { type: "send", message: "Now you don’t come back come to me no more, got it?" },
              { type: "reply", message: "Uhh, yeah, got it... I guess." },
              { type: "send", message: "Good good. *meow*" },
              { type: "send", message: "Just keep that muzzle muted, you feel?" },
              { type: "send", message: "If anyone come sniffin’, you never seen me, aight? Aight." },
              { type: "send", message: "Oh, and uhhh, pop out some paper, might help to write stuff down." },
              { type: "send", message: "Have a good one, G!" },
            ]} />

          <TextBlock type="instruction" message="Solve the maze and take note of the letters that you step over. It might not make sense at first but once the prime pattern is revealed, so will the code. Type it in the box below. Answers are not case-sensitive but don’t put extra spaces. " />

          <Maze />
        </Sequential>
      </div>
    </>
  )
}
