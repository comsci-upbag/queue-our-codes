import Image from "next/image";
import { TypeAnimation } from "react-type-animation";

import styles from "@/styles/Dialogue.module.css"
import { useEffect, useState } from "react";

interface Message {
  type: "send" | "reply";
  message: string;
}

interface Props {
  sender: string;
  senderImage: string;
  script: Message[];
  isFinished: boolean;
  setIsDialogueFinished?: (isDialogueFinished: boolean) => void;
}

export default function Dialogue({ sender, senderImage, script, isFinished, setIsDialogueFinished }: Props) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(Array(script.length).fill(true));

  const updateCurrentMessageIndex = () => {
    let index = currentMessageIndex;

    if (index < script.length && script[index].type !== "reply")
      index++;

    if (index < script.length) {
      setCurrentMessageIndex(index);
    } else {
      setCurrentMessageIndex(script.length);

      if (setIsDialogueFinished)
        setIsDialogueFinished(true);
    }
  }

  const MessageBlock = (message: Message) => {
    return <TypeAnimation sequence={["", 2000
      , message.message, 1000]} />
  }

  useEffect(() => {
    setTimeout(() => {
      updateCurrentMessageIndex();
      setIsTyping(() => {
        let newIsTyping = [...isTyping];
        newIsTyping[currentMessageIndex - 1] = false;
        return newIsTyping;
      });
    }, 1000);
  }, [currentMessageIndex])

  if (!isFinished)

    return (
      <>
        {script.slice(0, currentMessageIndex).map(
          (message, index) => {
            if (message.type === "send") {
              if (index > 0 && script[index - 1].type === "send" && script[index].type === "send") {
                return <div key={index} className={styles.container}>
                  <div className={styles.sender}>
                    {isTyping[index] ?
                      <p key={index + "loading"}>
                        <span className={styles.typingAnimation}>
                          <span className={styles.typingAnimationDot}></span>
                          <span className={styles.typingAnimationDot}></span>
                          <span className={styles.typingAnimationDot}></span>
                        </span>
                      </p>
                      : <p key={index}>{message.message}</p>
                    }
                  </div>
                </div>
              } else {
                return <div key={index} className={styles.container}>
                  <div className={styles.sender}>
                    <Image src={senderImage} width={32} height={32} alt="Picture of the sender" />
                    <h1>{sender}</h1>
                    {isTyping[index] ?
                      <p key={index + "loading"}>
                        <span className={styles.typingAnimation}>
                          <span className={styles.typingAnimationDot}></span>
                          <span className={styles.typingAnimationDot}></span>
                          <span className={styles.typingAnimationDot}></span>
                        </span>
                      </p>
                      : <p key={index}>{message.message}</p>
                    }
                  </div>
                </div>
              }
            }

            return (
              <div key={index} className={styles.receiver}>
                <p>{message.message}</p>
              </div>
            )
          }
        )}
        <div className={styles.inputMessage}>
          <div className={styles.inputWrapper}>
            {currentMessageIndex < script.length && script[currentMessageIndex].type === "reply" ? MessageBlock(script[currentMessageIndex]) : <p></p>}
          </div>
          <Image src="/submit.svg" onClick={() => {
            if (!isTyping[currentMessageIndex - 1])
              setCurrentMessageIndex(currentMessageIndex + 1);
          }} width={32} height={32} alt="Arrow" />
        </div>
      </>
    )

  return <>
    {script.map(
      (message, index) => {
        if (message.type === "send") {
          if (index > 0 && script[index - 1].type === "send" && script[index].type === "send") {
            return <div key={index} className={styles.container}>
              <div className={styles.sender}>
                <p key={index}>{message.message}</p>
              </div>
            </div>
          } else {
            return <div key={index} className={styles.container}>
              <div className={styles.sender}>
                <Image src={senderImage} width={32} height={32} alt="Picture of the sender" />
                <h1>{sender}</h1>
                <p key={index}>{message.message}</p>
              </div>
            </div>
          }
        }

        return (
          <div key={index} className={styles.receiver}>
            <p>{message.message}</p>
          </div>
        )
      }
    )}
  </>
}
