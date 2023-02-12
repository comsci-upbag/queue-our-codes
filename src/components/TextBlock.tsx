

import { TypeAnimation } from "react-type-animation";

import styles from "@/styles/TextBlock.module.css"

interface Props {
  message: string
  callback: (x: boolean) => void | null;
  type: "narration" | "instruction" | "note" | "quote";
}

export default function TextBlock({ message, callback, type }: Props) {

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
          callback(true);
        }]}
        cursor={false}
        speed={75}
        wrapper="div" />
    </div>
  )
}
