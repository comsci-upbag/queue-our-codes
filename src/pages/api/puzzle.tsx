import WebCam from "@/components/WebCam"
import Dialogue from "@/components/Dialogue";

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
          ]} />
          {currentPuzzle === puzzleId && <WebCam />}
        </span>
      </>
    )
  }

  return (
    <></>
  )

}

export default Puzzle;
