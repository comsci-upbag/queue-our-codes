import Image from "next/image";
import { TypeAnimation } from "react-type-animation"

import styles from "@/styles/Dialogue.module.css"
import { useEffect, useState } from "react";

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
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  const updateCurrentMessageIndex = () => {
    let index = currentMessageIndex;
    index++;

    while (index < script.length && script[index].type !== "reply")
      index++;

    if (index < script.length)
      setCurrentMessageIndex(index);
    else
      setCurrentMessageIndex(script.length);
  }

  const MessageBlock = (message: Message) => {
    return message.message.map(
      (message, index) => <p key={index} className={styles.animate}>{message}</p>
    )
  }

  useEffect(() => {
    updateCurrentMessageIndex();
  }, []);

  return (
    <>
      {script.slice(0, currentMessageIndex).map(
        (message, index) => {
          if (message.type === "send") {
            return (
              <div key={index} className={styles.container}>
                <div className={styles.sender}>
                  <Image src={senderImage} width={32} height={32} alt="Picture of the sender" />
                  <h1>{sender}</h1>
                  {message.message.map(
                    (message, index) => <p key={index}>{message}</p>
                  )}
                </div>
              </div>
            )
          }

          return (
            <div key={index} className={styles.receiver}>
              {message.message.map(
                (message, index) => <p key={index}>{message}</p>
              )}
            </div>
          )
        }
      )}
      <div className={styles.inputMessage}>
        <div className={styles.inputWrapper}>
          {currentMessageIndex < script.length && script[currentMessageIndex].type === "reply" ? MessageBlock(script[currentMessageIndex]) : <p></p>}
        </div>
        <Image src="/submit.svg" onClick={updateCurrentMessageIndex} width={32} height={32} alt="Arrow" />
      </div>
    </>
  )
}
