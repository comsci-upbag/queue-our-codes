import dynamic from "next/dynamic";

const AlertBox = dynamic(() => import("@/components/AlertBox"));

import WebCam from "@/components/WebCam"
import LoadingIndicator from "@/components/LoadingIndicator";

import styles from "@/styles/Puzzle.module.css"

import { useState } from "react";

import { TypeAnimation } from "react-type-animation";
import TextBlock from "@/components/TextBlock";
import Show from "@/components/Show";

interface Props {
  puzzleId: number;
  currentPuzzle: number;
}

export default function Puzzle1({ puzzleId, currentPuzzle }: Props) {
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [showWebcam, setShowWebcam] = useState<boolean>(false);
  const [showLoading, setShowLoading] = useState<boolean>(false);

  const validateImage = (image: string) => {
    setShowLoading(true);
    fetch("api/validateImage", {
      method: 'POST',
      body: JSON.stringify({ image })
    }).then(result => {
      setShowLoading(false);
      result.json().then(
        (result) => {
          const { isAnswerCorrect } = result;
          if (isAnswerCorrect) {
            setTimeout(() => {
              window.location.href = "/";
            }, 1000);
          }

          setIsAnswerCorrect(isAnswerCorrect);
          setShowAlert(true);
          return result;
        }
      )
    })
  }

  return (
    <>
      <div className={styles.container}>
        <TextBlock
          message="While searching for this place, you found something odd — a cream-colored fur. Delighted, you have decided to ask the cats their testimonies and alibis."
          callback={setShowInstructions}
          type="narration" />
        <Show when={showInstructions}>
          <TextBlock
            message="Use the button below to scan the picture of the cat. This will run an AI model to validate that the cat you are investigating is correct. While scanning a cat, make sure that no other cats are in view of your camera."
            callback={setShowWebcam}
            type="instruction" />
        </Show>
        <Show when={showWebcam}>
          <WebCam buttonLabel="Start Looking" callback={validateImage} />
        </Show>

        <Show when={showLoading}>
          <LoadingIndicator />
        </Show>

        <AlertBox showWhen={showAlert && !isAnswerCorrect} title="Wrong answer!" message="Sadly, this is not the cat we are looking for." type="warning" show={setShowAlert} />
        <AlertBox showWhen={showAlert && isAnswerCorrect} title={"Congratulations!"} message={"You've found Tonton!"} type={"success"} show={setShowAlert} />
      </div>
    </>
  )
}
