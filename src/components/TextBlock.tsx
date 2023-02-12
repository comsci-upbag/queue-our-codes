

import { TypeAnimation } from "react-type-animation";

import styles from "@/styles/TextBlock.module.css"
import { currentComponentState, visibilePuzzleState } from "@/globals/states"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { div } from "@tensorflow/tfjs";

interface Props {
  message: string
  type: "narration" | "instruction" | "note" | "quote";
}

export default function TextBlock({ message, type }: Props) {

  const setCurrentComponentFinished = useSetRecoilState(currentComponentState);
  const isFinished = useRecoilValue(visibilePuzzleState);

  const styleMap = new Map([
    ["narration", styles.narration],
    ["instruction", styles.instruction],
    ["quote", styles.quote],
    ["note", styles.note],
  ])

  if (isFinished) {
    setCurrentComponentFinished(true)
    return (
      <div className={styleMap.get(type)}>
        {message}
      </div>
    )
  }

  return (
    <div className={styleMap.get(type)}>
      <TypeAnimation
        sequence={[0, message, () => {
          setCurrentComponentFinished(true)
        }]}
        cursor={false}
        speed={75}
        wrapper="div" />
    </div>
  )
}
