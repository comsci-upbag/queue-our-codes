

import { TypeAnimation } from "react-type-animation";

import styles from "@/styles/TextBlock.module.css"

interface Props {
  message: string
  callback: (x: boolean) => void | null;
  type: "narration" | "instruction";
}

export default function TextBlock({ message, callback, type }: Props) {
  return (
    <div className={type === "narration" ? styles.narration : styles.instruction}>
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