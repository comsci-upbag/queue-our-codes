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
              { type: "send", message: "Excuse me, do you happen to know about Butternut?" },
              { type: "send", message: "Butternut? What butternut? *meow* OH. Oh yes, I am Butternut, but as you can see, I’m quite busy right meow." },
              { type: "reply", message: "Umm, how about I help you with what you’re working on and in return, you’ll give me information about something I’m trying to find. Deal?" },
              { type: "send", message: "Well, if you insist, I guess I can work with that. *meow*" },
              { type: "send", message: "So I’ve been trying to learn human words and slang for quite some time now. I’m trying to do so through crossword-like puzzles. *meow* It was going well but I got stuck with this specific item. Solving the following riddles reveals a 4-letter word as a final answer." }
            ]}
            isFinished={currentPuzzle !== puzzleId}
            setIsDialogueFinished={setIsDialogueFinished} />
        </Show>

        <Show when={isAnswerCorrect! || currentPuzzle !== puzzleId}>
          <Dialogue sender="Mr. Cat 2" senderImage="/logo.svg" 
            script={[
              { type: "send", message: "Finally! Thank you for helping me out. Sike is the human slang that means something like “just kidding.” meow" },
              { type: "send", message: "Meowkay. Right, you needed information about something right? meow" },
              { type: "reply", message: "Yeah, I’m trying to find this chicken thief that is said to be a cat. Do you know anything about it?" },
              { type: "send", message: "I hate to break this to you after helping me and all but… SIKE! Haha! I really have no idea. meow I’ve been so busy that I didn’t notice anything at all! I’m not even Butternut! I’m Tonyo." },
              { type: "reply", message: "You wasted my time!" },
              { type: "send", message: "MEOW, WAIT! I do know someone who might help. meow I’ll call them for you. It’s my thanks for having you help me. meow" },
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
