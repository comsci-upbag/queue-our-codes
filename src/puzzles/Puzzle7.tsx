import dynamic from "next/dynamic";

const AlertBox = dynamic(() => import("@/components/AlertBox"));

import Dialogue from "@/components/Dialogue"
import Show from "@/components/Show";

import styles from "@/styles/Home.module.css"

import { useState } from "react";
import QRCode from "@/components/QRCode";

interface Props {
  puzzleId: number;
  currentPuzzle: number;
}

export default function Puzzle7({ puzzleId, currentPuzzle }: Props) {
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isDialogueFinished, setIsDialogueFinished] = useState<boolean>(false);

  const validateQRCode = async (decodedText: string) => {
    const result = await fetch("api/validateQRCode", {
      method: 'POST',
      body: JSON.stringify({ decodedText })
    })
    const { isAnswerCorrect } = await result.json();
    setIsAnswerCorrect(isAnswerCorrect);
    setShowAlert(true);
  }

  return (
    <>
      <span id={styles.cluecont}>

        <Show when={!isAnswerCorrect!}>
          <Dialogue sender="Mr. Cat 1" senderImage="/logo.svg" script={[
            { type: "send", message: "I want you to look for someone with a white fur and a yellow head." },
            { type: "reply", message: "Where should I look?" },
            { type: "send", message: "Why should I tell you?" },
            { type: "send", message: "It's up to you to find them." },
            { type: "reply", message: "I see. I'll start looking then!" },
          ]}
            isFinished={currentPuzzle !== puzzleId}
            setIsDialogueFinished={setIsDialogueFinished} />
        </Show>

        <Show when={isAnswerCorrect! || currentPuzzle !== puzzleId}>
          <Dialogue sender="Mr. Cat 2" senderImage="/logo.svg" script={[
            { type: "send", message: "I want you to look for someone with a white fur and a yellow head." },
            { type: "reply", message: "Where should I look?" },
            { type: "send", message: "Why should I tell you?" },
            { type: "send", message: "It's up to you to find them." },
            { type: "reply", message: "I see. I'll start looking then!" },
          ]}
            isFinished={currentPuzzle !== puzzleId} />
        </Show>

        <Show when={currentPuzzle === puzzleId && isDialogueFinished && !isAnswerCorrect}>
          <QRCode buttonLabel="Start Scanning" onResultCallback={validateQRCode} />
        </Show>

        <AlertBox showWhen={showAlert && !isAnswerCorrect} title={"Wrong answer!"} message={"Sadly, this is not the cat we are looking for."} type={"warning"} show={setShowAlert} />
        <AlertBox showWhen={showAlert && isAnswerCorrect} title={"Co{showAlert && isAnswerCorrect && ngratulations!"} message={"You've found {cat name}!"} type={"success"} show={setShowAlert} />
      </span>
    </>
  )
}
