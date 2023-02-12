import dynamic from "next/dynamic";

const AlertBox = dynamic(() => import("@/components/AlertBox"));

import WebCam from "@/components/WebCam"

import styles from "@/styles/Puzzle.module.css"

import { useState } from "react";

import { TypeAnimation } from "react-type-animation";

interface Props {
  puzzleId: number;
  currentPuzzle: number;
}

export default function Puzzle1({ puzzleId, currentPuzzle }: Props) {
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [showWebcam, setShowWebcam] = useState<boolean>(false);

  const validateImage = async (image: string) => {
    const result = await fetch("api/validateImage", {
      method: 'POST',
      body: JSON.stringify({ image })
    })
    const { isAnswerCorrect } = await result.json();
    if (isAnswerCorrect) {
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }

    setIsAnswerCorrect(isAnswerCorrect);
    setShowAlert(true);
    return result;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.narration}>
          <TypeAnimation
            sequence={[0, "While searching for this place, you found something odd — a cream-colored fur. Delighted, you have decided to ask the cats their testimonies and alibis.", () => {
              setShowInstructions(true);
            }]}
            cursor={false}
            speed={75}
            wrapper="div" />
        </div>
        <div className={styles.direction}>
          {showInstructions && <TypeAnimation sequence={[0, "Use the button below to scan the picture of the cat. This will run an AI model to validate that the cat you are investigating is correct. While scanning a cat, make sure that no other cats are in view of your camera.", () => {
            setShowWebcam(true)
          }]}
            cursor={false}
            speed={75}
            wrapper="div" />}
        </div>

        {showWebcam && <WebCam buttonLabel="Start Looking" callback={validateImage} />}

        <AlertBox showWhen={showAlert && !isAnswerCorrect} title="Wrong answer!" message="Sadly, this is not the cat we are looking for." type="warning" show={setShowAlert} />
        <AlertBox showWhen={showAlert && isAnswerCorrect} title={"Congratulations!"} message={"You've found Tonton!"} type={"success"} show={setShowAlert} />
      </div>
    </>
  )
}
