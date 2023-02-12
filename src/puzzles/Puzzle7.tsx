import dynamic from "next/dynamic";

const AlertBox = dynamic(() => import("@/components/AlertBox"));

import Dialogue from "@/components/Dialogue"

import styles from "@/styles/Puzzle.module.css"

import { useState } from "react";
import QRCode from "@/components/QRCode";
import Sequential from "@/components/Sequential";

interface Props {
  puzzleId: number;
  currentPuzzle: number;
}

export default function Puzzle7({ puzzleId, currentPuzzle }: Props) {
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [showAlert, setShowAlert] = useState<boolean>(false);

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
      <div className={styles.container}>
        <Sequential>
          <Dialogue sender="Mr. Cat 1" senderImage="/logo.svg" script={[
            { type: "send", message: "Excuse me, do you happen to know about Butternut?" },
            { type: "send", message: "Butternut? What butternut? *meow* OH. Oh yes, I am Butternut, but as you can see, I’m quite busy right meow." },
            { type: "reply", message: "Umm, how about I help you with what you’re working on and in return, you’ll give me information about something I’m trying to find. Deal?" },
            { type: "send", message: "Well, if you insist, I guess I can work with that. *meow*" },
            { type: "send", message: "So I’ve been trying to learn human words and slang for quite some time now. I’m trying to do so through crossword-like puzzles. *meow* It was going well but I got stuck with this specific item. Solving the following riddles reveals a 4-letter word as a final answer." }
          ]} />

          <QRCode buttonLabel="Start Scanning" onResultCallback={validateQRCode} />
        </Sequential>

        <AlertBox showWhen={showAlert && !isAnswerCorrect} title={"Wrong answer!"} message={"Sadly, this is not the cat we are looking for."} type={"warning"} show={setShowAlert} />
        <AlertBox showWhen={showAlert && isAnswerCorrect} title={"Co{showAlert && isAnswerCorrect && ngratulations!"} message={"You've found {cat name}!"} type={"success"} show={setShowAlert} />
      </div>
    </>
  )
}
