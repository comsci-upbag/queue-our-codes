import Image from "next/image";

import styles from "@/styles/Dialogue.module.css"
import { useState } from "react";

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
  return (
    <>
      {script.map(
        (message, index) => {
          if (message.type === "send") {
            return (
              <div key={index} className={styles.sender}>
                <Image src={senderImage} width={32} height={32} alt="Picture of the sender" />
                <h1>{sender}</h1>
                {message.message.map(
                  (message, index) => {
                    return (
                      <p key={index}>{message}</p>
                    )
                  }
                )}
              </div>
            )
          }

          return (
            <div key={index} className={styles.receiver}>
              {message.message.map(
                (message, index) => {
                  return (
                    <p key={index}>{message}</p>
                  )
                }
              )}
            </div>
          )
        }
      )}
    </>
  )
}