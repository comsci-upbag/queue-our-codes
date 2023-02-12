

import { TypeAnimation } from "react-type-animation";

import styles from "@/styles/TextBlock.module.css"
import { currentComponentState } from "@/globals/states"
import { useSetRecoilState } from "recoil"

interface Props {
  message: string
  type: "narration" | "instruction" | "note" | "quote";
}

export default function TextBlock({ message, type }: Props) {

  const setCurrentComponentFinished = useSetRecoilState(currentComponentState);

  const styleMap = new Map([
    ["narration", styles.narration],
    ["instruction", styles.instruction],
    ["quote", styles.quote],
    ["note", styles.note],
  ])

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
