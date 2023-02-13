
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

    const request = { answer: debouncedValue }

    fetch("api/validateAnswer", {
      method: "POST",
      body: JSON.stringify(request),
    }).then((data) => data.json())
      .then((data) => {
        // if (data.isAnswerCorrect) {
        //   // do something
        // } else {
        //   // do something
        // }
      })

  }, [debouncedValue])

  return <button onClick={onClick}> 🐱 </button>
}
