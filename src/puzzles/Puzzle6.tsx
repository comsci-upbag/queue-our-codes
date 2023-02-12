
import Dialogue from "@/components/Dialogue";
import Maze from "@/components/Maze";
import Show from "@/components/Show"

import styles from "@/styles/Puzzle.module.css";

interface Props {
  puzzleId: number;
  currentPuzzle: number;
}

export default function Puzzle6({ puzzleId, currentPuzzle }: Props) {
  return (
    <>
      <div className={styles.container}>
        <Dialogue sender="Mr. Cat" senderImage="/logo.svg"
          script={[
            { type: "send", message: "Ey yo, it’s Quatro! What’s good, chief? Meow on the street is some kitten on the prowl for a dirty chicken crook. Can’t have no filthy fowl filcher messing up good cats’ rep, so I’ll be rootin’ for you. meow" },
            { type: "reply", message: "Do you know who the thief is? Wait, how did you know about the chi— " },
            { type: "send", message: "Nah, but I do not who the thief is though I may just know who does... but I ain’t no squealer! meow You gon’ have to work for it... I got my paws on this here maze, hint hint." },
            { type: "reply", message: "So... I solve this then you’ll tell me?" },
            { type: "send", message: "Nah! I already gave you the goods, homie. meow Now you don’t come back come to me no more, got it?" },
            { type: "reply", message: "Uhh, yeah, got it... I guess." },
            { type: "send", message: "Good good. meow Just keep that muzzle muted, you feel? If anyone come sniffin’, you never seen me, aight? Aight." },
            { type: "send", message: "Oh, and uhhh, pop out some paper, might help to write stuff down. Have a good one, G!" },
          ]} />

        <Show when={currentPuzzle === puzzleId}>
          <Maze />
        </Show>
      </div>
    </>
  )
}
