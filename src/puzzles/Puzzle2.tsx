
import styles from "@/styles/Home.module.css";

interface Props {
  puzzleId: number;
  currentPuzzle: number;
}

export default function Puzzle2({ puzzleId, currentPuzzle }: Props) {
  return (
    <>
      <span id={styles.cluecont}>
        From this ancient dwelling, our names rest. <br /> <br />
        Your ancestors has built them <br /> <br />
        To safekeep their crops from the same pest we hunt. <br /> <br />
        <br /> <br />
        Let our presence guide you to your lofty quest; <br /> <br />
        'Cause I know one of us had a delightful feast. <br /> <br />
        <br /> <br />
        Remember, we are not one, but among many you will see. <br /> <br />
        <div style={{ textAlign: "right", width: "100%" }}>- The Fale Sleeper </div>
      </span>
    </>
  )
}
