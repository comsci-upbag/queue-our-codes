import Image from "next/image";
import { TypeAnimation } from "react-type-animation"

import styles from "@/styles/Dialogue.module.css"

interface Message {
  type: "send" | "reply";
  message: string[];
}

interface Props {
  sender: string;
  senderImage: string;
  script: Message[];
}

export default function Dialogue({ sender, senderImage, script }: Props) {

  const MessageBlock = (message: Message) => {
    return message.message.map((message, index) => <TypeAnimation sequence={[message, 1000]} wrapper="p" key={index}/>)
  }

  return (
    <>
      {script.map(
        (message, index) => {
          if (message.type === "send") {
            return (
              <div key={index} className={styles.sender}>
                <Image src={senderImage} width={32} height={32} alt="Picture of the sender" />
                <h1>{sender}</h1>
                {MessageBlock(message)}
              </div>
            )
          }

          return (
            <div key={index} className={styles.receiver}>
              {MessageBlock(message)}
            </div>
          )
        }
      )}
    </>
  )
}
