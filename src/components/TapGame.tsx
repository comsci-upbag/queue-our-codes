
import { useDebounce } from "@/globals/hooks"
import { useEffect, useState } from "react"

import styles from "@/styles/TapGame.module.css"
import dynamic from "next/dynamic";

const AlertBox = dynamic(() => import("./AlertBox"), {
  ssr: false,
})

export default function TapGame() {

  const [shouldShowAlertBox, setShouldShowAlertBox] = useState(false)
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false)
  const [triesLeft, setTriesLeft] = useState(2)
  const [numClicked, setNumClicked] = useState(0);
  const debouncedValue = useDebounce(numClicked, 1000);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setNumClicked(numClicked + 1);
  }

  useEffect(() => {

    const request = { answer: debouncedValue.toString() }
    console.log(request.answer)

    fetch("api/validateAnswer", {
      method: "POST",
      body: JSON.stringify(request),
    }).then(data => data.json())
      .then(data => {
        const { isAnswerCorrect, triesLeft } = data
        setIsAnswerCorrect(isAnswerCorrect)
        setTriesLeft(triesLeft)
        if (triesLeft === 0) {
          window.location.href = "/"
        }
        if (isAnswerCorrect) {
          setShouldShowAlertBox(true)
        } else {
          setNumClicked(0);
        }
      })

  }, [debouncedValue])

  return <div className={styles.container}>
    <AlertBox showWhen={shouldShowAlertBox && isAnswerCorrect} title="Congratulations!" message="Good job! That is indeed the answer to this puzzle!" type="success" show={setShouldShowAlertBox} callbackWhenClosed={() => window.location.href = "/"} />
    <AlertBox showWhen={shouldShowAlertBox && !isAnswerCorrect} title="Wrong answer!" message={"Sadly, this is not the answer we are looking for. You have " + triesLeft + (triesLeft === 1 ? " try left." : " tries left.")} type="warning" show={setShouldShowAlertBox} />
    <button onClick={onClick} className={styles.button}> 🐱 </button>
  </div>
}
