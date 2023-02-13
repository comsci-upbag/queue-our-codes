
import { useDebounce } from "@/globals/hooks"
import { useEffect, useState } from "react"

export default function TapGame() {

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
      .then(data => data.isAnswerCorrect)
      .then(isAnswerCorrect => {
        if (isAnswerCorrect) {
          window.location.reload();
        } else {
          setNumClicked(0);
        }
      })

  }, [debouncedValue])

  return <button onClick={onClick}> 🐱 </button>
}
