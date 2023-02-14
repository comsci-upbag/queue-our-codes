
import { useState } from "react"

import Image from "next/image";

import styles from "@/styles/TapGame.module.css"
import dynamic from "next/dynamic";
import LoadingIndicator from "./LoadingIndicator";
import Show from "./Show";

const AlertBox = dynamic(() => import("./AlertBox"), {
  ssr: false,
})

export default function TapGame() {

  const [shouldShowAlertBox, setShouldShowAlertBox] = useState(false)
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false)
  const [triesLeft, setTriesLeft] = useState(1)
  const [numClicked, setNumClicked] = useState(0);
  const [showLoading, setShowLoading] = useState(false)

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setNumClicked(numClicked + 1);
  }

  const submit = () => {
    setShowLoading(true);
    const request = { answer: numClicked.toString() }
    console.log(request.answer)

    fetch("api/validateAnswer", {
      method: "POST",
      body: JSON.stringify(request),
    }).then(data => data.json())
      .then(data => {
        setShowLoading(false)
        const { isAnswerCorrect, triesLeft } = data
        setIsAnswerCorrect(isAnswerCorrect)
        setTriesLeft(triesLeft)
        if (triesLeft === 0) {
          window.location.href = "/"
        } else {
          if (!isAnswerCorrect)
            setNumClicked(0)

          setShouldShowAlertBox(true)
        }
      })

  }

  return <div className={styles.container}>
    <Show when={showLoading}>
      <LoadingIndicator />
    </Show>
    <AlertBox showWhen={shouldShowAlertBox && isAnswerCorrect} title="Congratulations!" message="Good job! That is indeed the answer to this puzzle!" type="success" show={setShouldShowAlertBox} callbackWhenClosed={() => window.location.href = "/"} />
    <AlertBox showWhen={shouldShowAlertBox && !isAnswerCorrect} title="Wrong answer!" message={"Sadly, this is not the answer we are looking for. You have " + triesLeft + (triesLeft === 1 ? " try left." : " tries left.")} type="warning" show={setShouldShowAlertBox} />
    <button onClick={onClick} style={{
      marginBottom: "10px",
    }} className={styles.button}> 🐱 </button>
    <p>{numClicked}</p>
    <button onClick={submit} style={{
      marginBottom: "10px",
    }} className={styles.button}><Image src="submit.svg" alt="Submit Button" width={25} height={25} /> </button>
  </div>
}
