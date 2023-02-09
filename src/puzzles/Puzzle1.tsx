import dynamic from "next/dynamic";

const AlertBox = dynamic(() => import("@/components/AlertBox"));

import Dialogue from "@/components/Dialogue"
import WebCam from "@/components/WebCam"
import ConditionalShow from "@/components/ConditionalShow";

import styles from "@/styles/Home.module.css"

import { useState } from "react";

interface Props {
  puzzleId: number;
  currentPuzzle: number;
}

export default function Puzzle1({ puzzleId, currentPuzzle }: Props) {
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isDialogueFinished, setIsDialogueFinished] = useState<boolean>(false);

  const validateImage = async (image: string) => {
    const result = await fetch("api/validateImage", {
      method: 'POST',
      body: JSON.stringify({ image })
    })
    const { isAnswerCorrect } = await result.json();
    setIsAnswerCorrect(isAnswerCorrect);
    setShowAlert(true);
    return result;
  }

  return (
    <>
      <span id={styles.cluecont}>
        <ConditionalShow shouldShow={!isAnswerCorrect!}>
          <Dialogue sender="Mr. Cat 1" senderImage="/logo.svg" script={[
            { type: "send", message: "I want you to look for someone with a white fur and a yellow head." },
            { type: "reply", message: "Where should I look?" },
            { type: "send", message: "Why should I tell you?" },
            { type: "send", message: "It's up to you to find them." },
            { type: "reply", message: "I see. I'll start looking then!" },
          ]}
            isFinished={currentPuzzle !== puzzleId}
            setIsDialogueFinished={setIsDialogueFinished} />
        </ConditionalShow>
        <ConditionalShow shouldShow={isAnswerCorrect! || currentPuzzle !== puzzleId}>
          <Dialogue sender="Mr. Cat 2" senderImage="/logo.svg" script={[
            { type: "send", message: "I want you to look for someone with a white fur and a yellow head." },
            { type: "reply", message: "Where should I look?" },
            { type: "send", message: "Why should I tell you?" },
            { type: "send", message: "It's up to you to find them." },
            { type: "reply", message: "I see. I'll start looking then!" },
          ]}
            isFinished={currentPuzzle !== puzzleId} />
        </ConditionalShow>
        {currentPuzzle === puzzleId && isDialogueFinished && !isAnswerCorrect && <WebCam buttonLabel="Start Looking" callback={validateImage} />}
        {showAlert && !isAnswerCorrect && <AlertBox title={"Wrong answer!"} message={"Sadly, this is not the cat we are looking for."} type={"warning"} show={setShowAlert} />}
        {showAlert && isAnswerCorrect && <AlertBox title={"Congratulations!"} message={"You've found {cat name}!"} type={"success"} show={setShowAlert} />}
      </span>
    </>
  )
}
