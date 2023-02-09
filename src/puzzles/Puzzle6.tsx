
import Dialogue from "@/components/Dialogue";
import Maze from "@/components/Maze";
import Show from "@/components/Show"

import styles from "@/styles/Home.module.css";

interface Props {
  puzzleId: number;
  currentPuzzle: number;
}

export default function Puzzle6({ puzzleId, currentPuzzle }: Props) {
  return (
    <>
      <span id={styles.cluecont}>
        <Dialogue sender="Mr. Cat" senderImage="/logo.svg" script={[
          { type: "send", message: "Ey yo, what's good chief." },
          { type: "send", message: "Word is some kitten on the prowl for a dirty chicken crook." },
          { type: "send", message: "Can't have no filthy fowl filcher messing up good cats' rep, so I'll be rootin' for you." },
          { type: "reply", message: "Do you have any idea who the thief is?" },
          { type: "send", message: "Now I don't know who the thief is, but I may just know who does... but I ain't no squealer!" },
          { type: "send", message: "However, on a completely unrelated note, I got my paws on this here maze, hint hint." },
          { type: "reply", message: "Huh? Would solving this maze lead me to something?" },
        ]}
          isFinished={currentPuzzle !== puzzleId} />

        <Show when={currentPuzzle === puzzleId}>
          <Maze />
        </Show>
      </span>
    </>
  )
}
