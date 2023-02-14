import Image from "next/image";
import styles from "@/styles/Home.module.css"

import { useRef, useState, useEffect } from "react"
import { useRecoilValue } from "recoil";

import { answerBoxVisibilityState } from "@/globals/states";

import dynamic from "next/dynamic";
const AlertBox = dynamic(() => import("./AlertBox"), {
  ssr: false,
})

interface Props {
  isAnswered: boolean,
  answer: string | null,
  puzzleId: number,
}

// convert milliseconds to string in mm:ss format
function msToHMS(ms: number) {
  // 1- Convert to seconds:
  let seconds = ms / 1000;
  // 2- Extract hours:
  const hours = seconds / 3600; // 3,600 seconds in 1 hour
  seconds = seconds % 3600; // seconds remaining after extracting hours
  // 3- Extract minutes:
  const minutes = seconds / 60; // 60 seconds in 1 minute
  // 4- Keep only seconds not extracted to minutes:
  seconds = seconds % 60;
  if (Math.floor(minutes) > 1 && Math.floor(seconds) === 0) return (Math.floor(minutes) + " minutes")
  if (Math.floor(minutes) > 1 && Math.floor(seconds) !== 1) return (Math.floor(minutes) + " minutes and " + Math.floor(seconds) + " seconds")
  if (Math.floor(minutes) > 1 && Math.floor(seconds) === 1) return (Math.floor(minutes) + " minutes and a second")
  if (Math.floor(minutes) == 1 && Math.floor(seconds) === 0) return ("a minute")
  if (Math.floor(minutes) == 1 && Math.floor(seconds) !== 1) return ("a minute and " + Math.floor(seconds) + " seconds")
  if (Math.floor(minutes) == 1 && Math.floor(seconds) === 1) return ("a minute and " + Math.floor(seconds) + " second")
  if (Math.floor(minutes) == 0 && Math.floor(seconds) !== 1) return (Math.floor(seconds) + " seconds")
  if (Math.floor(minutes) == 0 && Math.floor(seconds) == 1) return ("a second")
  return (Math.floor(seconds) + " second/s");
}


export default function AnswerBox({ isAnswered, answer, puzzleId }: Props) {

  const isAnswerBoxShown = useRecoilValue(answerBoxVisibilityState);
  const inputField = useRef<HTMLInputElement>(null);

  const [timeUntilCanSubmit, setTimeUntilCanSubmit] = useState<number | null>(null);
  const [shouldShowAlertBox, setShouldShowAlertBox] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [triesLeft, setTriesLeft] = useState(-1)
  const [showLoading, setShowLoading] = useState(false)

  const onSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setShowLoading(true);

    const request = {
      answer: inputField.current?.value
    };

    fetch("/api/validateAnswer", {
      method: "POST",
      body: JSON.stringify(request),
    }).then(data => data.json())
      .then(data => data as { isAnswerCorrect: boolean, timeUntilCanSubmit: number | null, triesLeft: number, shouldReload: boolean })
      .then(data => {
        setIsAnswerCorrect(data.isAnswerCorrect)
        setTriesLeft(triesLeft)
        setTimeUntilCanSubmit(data.timeUntilCanSubmit);

        if (data.isAnswerCorrect) {
          setShouldShowAlertBox(true)
          return;
        }

        if (puzzleId == 4 && data.timeUntilCanSubmit !== null) {
          setTimeUntilCanSubmit(data.timeUntilCanSubmit);
        }

        setShouldShowAlertBox(true)
        setShowLoading(false)
      })
  }

  if (isAnswered)
    return (
      <div className={styles.HomeContainer} id={styles.InputContainer}>
        <input id={styles.InputField} type="text" placeholder={`Answer for #${puzzleId} is ${answer}`} disabled />
      </div>
    )

  if (isAnswerBoxShown)
    return (
      <>
        <Show when={showLoading}>
          <LoadingIndicator />
        </Show>
        <div className={styles.HomeContainer} id={styles.InputContainer}>
          <input ref={inputField} id={styles.InputField} type="text" placeholder="Answer" />
          <Image id={styles.SubmitButtonImage} src="submit.svg" alt="Submit Button" width={25} height={25} onClick={onSubmit} />
        </div>
      </>
    )

  return <></>
}
