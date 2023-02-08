import Dialogue from "@/components/Dialogue"
import WebCam from "@/components/WebCam"

import styles from "@/styles/Home.module.css"

import { useState } from "react";

interface Props {
  puzzleId: number;
  currentPuzzle: number;
}

export default function Puzzle2({ puzzleId, currentPuzzle }: Props) {

  const [label, setLabel] = useState<string | null>(null);
  const [probability, setProbability] = useState<number | null>(null);


  const validateImage = async (image: string) => {
    const result = await fetch("api/validateImage", {
      method: 'POST',
      body: JSON.stringify({ image })
    })
    const { label, probability } = await result.json();
    setLabel(label);
    setProbability(probability);
    return result;
  }

  return (
    <>
      <span id={styles.cluecont}>
        <Dialogue sender="Mr. Cat" senderImage="/logo.svg" script={[
          { type: "send", message: "I want you to look for someone with a white fur and a yellow head." },
          { type: "reply", message: "Where should I look?" },
          { type: "send", message: "Why should I tell you?" },
          { type: "send", message: "It's up to you to find them." },
          { type: "reply", message: "I see. I'll start looking then!" },
        ]}
          isFinished={currentPuzzle !== puzzleId} />
        {currentPuzzle === puzzleId && <WebCam buttonLabel="Start Looking" callback={validateImage} />}
        {label && <span>Label: {label}</span>}
        {probability && <span>Probability: {probability}</span>}
      </span>
    </>
  )
}
