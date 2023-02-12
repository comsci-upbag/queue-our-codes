import Image from "next/image";
import { TypeAnimation } from "react-type-animation";

import styles from "@/styles/Dialogue.module.css"
import { useEffect, useState, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentComponentState, visibilePuzzleState } from "@/globals/states";
import Show from "./Show";

interface Message {
  type: "send" | "reply";
  message: string;
}

interface Props {
  sender: string;
  senderImage: string;
  script: Message[];
}


export default function Dialogue({ sender, senderImage, script }: Props) {
  const dialogueContainer = useRef<HTMLDivElement>(null);

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(Array(script.length).fill(true));
  const [showInputBox, setShowInputBox] = useState(true);

  const setCurrentComponentFinished = useSetRecoilState(currentComponentState);
  const isFinished = useRecoilValue(visibilePuzzleState)

  const updateCurrentMessageIndex = () => {
    let index = currentMessageIndex;

    if (index < script.length && script[index].type !== "reply")
      index++;

    if (index < script.length) {
      setCurrentMessageIndex(index);
    } else {
      setCurrentMessageIndex(script.length);
      setCurrentComponentFinished(true);
      setShowInputBox(false);
    }
  }

  const MessageBlock = (message: Message) => {
    return <TypeAnimation sequence={[message.message, 1000]} />
  }

  useEffect(() => {
    setTimeout(() => {
      updateCurrentMessageIndex();
      setIsTyping(() => {
        let newIsTyping = [...isTyping];
        newIsTyping[currentMessageIndex - 1] = false;
        return newIsTyping;
      });
      setTimeout(() => {
        if (dialogueContainer.current)
          dialogueContainer.current.scrollTop = dialogueContainer.current.scrollHeight;
      }, 100);
    }, 1000);
  }, [currentMessageIndex])

  if (!isFinished)
    return (
      <div>
        <div className={styles.DialogueContainer} ref={dialogueContainer}>
          {script.slice(0, currentMessageIndex).map(
            (message, index) => {
              if (message.type === "send") {
                return <div key={index} className={styles.container}>
                  <div className={styles.sender}>
                    {index > 0 && script[index - 1].type === "send" && script[index].type === "send" ? <></> : <>
                      <Image src={senderImage} width={32} height={32} alt="Picture of the sender" />
                      <h1>{sender}</h1>
                    </>}
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

              return (
                <div key={index} className={styles.receiver}>
                  <p>{message.message}</p>
                </div>
              )
            }
          )}
        </div>
        <Show when={showInputBox}>
          <div className={styles.inputMessage}>
            <div key={currentMessageIndex} className={styles.inputWrapper}>
              {currentMessageIndex < script.length && script[currentMessageIndex].type === "reply" ? MessageBlock(script[currentMessageIndex]) : <p></p>}
            </div>
            <Image src="/submit.svg" onClick={() => {
              if (!isTyping[currentMessageIndex - 1]) {
                setCurrentMessageIndex(currentMessageIndex + 1);
                setTimeout(() => {
                  if (dialogueContainer.current)
                    dialogueContainer.current.scrollTop = dialogueContainer.current.scrollHeight;
                }, 100);
              }
            }} width={20} height={20} alt="Arrow" />
          </div>
        </Show>
      </div>
    )

  return (
    <div className={styles.DialogueContainer} ref={dialogueContainer}>
      {script.map(
        (message, index) => {
          if (message.type === "send") {
            return <div key={index} className={styles.container}>
              <div className={styles.sender}>
                {index > 0 && script[index - 1].type === "send" && script[index].type === "send" ? <></> : <>
                  <Image src={senderImage} width={32} height={32} alt="Picture of the sender" />
                  <h1>{sender}</h1>
                </>}
                <p key={index}>{message.message}</p>
              </div>
            </div>
          }

          return (
            <div key={index} className={styles.receiver}>
              <p>{message.message}</p>
            </div>
          )
        }
      )}
    </div>
  )
}
