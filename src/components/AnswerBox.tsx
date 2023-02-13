import Image from "next/image";
import styles from "@/styles/Home.module.css"

import { useRef, useState } from "react"
import { useRecoilValue } from "recoil";

import { answerBoxVisibilityState } from "@/globals/states";
import AlertBox from "./AlertBox";

interface Props {
  isAnswered: boolean,
  answer: string | null,
  puzzleId: number,
}


export default function AnswerBox({ isAnswered, answer, puzzleId }: Props) {

  const isAnswerBoxShown = useRecoilValue(answerBoxVisibilityState);
  const inputField = useRef<HTMLInputElement>(null);

  const [timeUntilCanSubmit, setTimeUntilCanSubmit] = useState(0);
  const [shouldShowAlertBox, setShouldShowAlertBox] = useState(false);

  const onSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const request = {
      answer: inputField.current?.value
    };

    fetch("/api/validateAnswer", {
      method: "POST",
      body: JSON.stringify(request),
    }).then(data => data.json())
      .then(data => data as { isAnswerCorrect: boolean, timeUntilCanSubmit: number})
      .then(data => {

        if (data.isAnswerCorrect) {
          window.location.reload();
          return;
        }

        if (puzzleId == 4) {
          setShouldShowAlertBox(true);
          setTimeUntilCanSubmit(data.timeUntilCanSubmit);
        }

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
        <AlertBox show={setShouldShowAlertBox} showWhen={shouldShowAlertBox} title="Uh oh!" message={`You have to wait until ${timeUntilCanSubmit * 1000 / 60}`} type="warning"/>
        <div className={styles.HomeContainer} id={styles.InputContainer}>
          <input ref={inputField} id={styles.InputField} type="text" placeholder="Answer" />
          <Image id={styles.SubmitButtonImage} src="submit.svg" alt="Submit Button" width={25} height={25} onClick={onSubmit} />
        </div>
      </>
    )

  return <></>
}
