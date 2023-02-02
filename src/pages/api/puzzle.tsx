import WebCam from "@/components/WebCam"
import Dialogue from "@/components/Dialogue";
import Maze from "@/components/Maze";

import styles from "@/styles/Home.module.css";

interface Props {
  puzzleId: number;
  currentPuzzle: number;
}

function Puzzle({ puzzleId, currentPuzzle }: Props) {

  if (puzzleId == 1) {
    return (
      <>
        <span id={styles.cluecont}>
          To use me, break me <br /><br />
          I am in front, but you can’t see me <br /><br />
          By the Laws of Physics, what goes up but never goes down? <br /><br />
          I get bigger the more is taken away
        </span>
      </>
    )
  }

  if (puzzleId == 2) {
    return (
      <>
        <span id={styles.cluecont}>
          <Dialogue sender="Mr. Cat" senderImage="/logo.svg" script={[
            { type: "send", message: ["I want you to look for someone with a white fur and a yellow head."] },
            { type: "reply", message: ["Where should I look?"] },
            {
              type: "send",
              message: ["Why should I tell you?",
                "It's up to you to find them."]
            },
            { type: "reply", message: ["I see. I'll start looking then!"] },
          ]} />
          {currentPuzzle === puzzleId && <WebCam />}
        </span>
      </>
    )
  }

  if (puzzleId == 3) {
    return (
      <>
        <span id={styles.cluecont}>
          <Dialogue sender="Mr. Cat" senderImage="/logo.svg" script={[
            {
              type: "send",
              message: ["Ey yo, what's good chief.",
                "Word is some kitten on the prowl for a dirty chicken crook.",
                "Can't have no filthy fowl filcher messing up good cats' rep, so I'll be rootin' for you.",
              ]
            },
            { type: "reply", message: ["Do you have any idea who the thief is?"] },
            {
              type: "send",
              message: ["Now I don't know who the thief is, but I may just know who does... but I ain't no squealer!",
                "However, on a completely unrelated note, I got my paws on this here maze, hint hint."]
            },
            { type: "reply", message: ["Huh? Would solving this maze lead me to something?"] },
          ]} />
          {currentPuzzle === puzzleId && <Maze />}
        </span>
      </>
    )
  }

  return (
    <></>
  )

}

export default Puzzle;
