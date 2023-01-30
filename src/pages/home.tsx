
import Image from "next/image"

import { signOut, getSession } from "next-auth/react"
import { NextPageContext } from "next";

import styles from "@/styles/Home.module.css"
import Puzzle from "./api/puzzle"


import { PrismaClient } from "@prisma/client";
import { useEffect, useRef, useState } from "react";

import { puzzleAnswers } from "../globals/puzzleAnswers"

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const prisma = new PrismaClient();

  const participant = await prisma.participantStatus.findUnique({
    where: {
      email: session.user.email
    }
  })

  // create user on the dataabse
  if (!participant) {
    await prisma.participantStatus.create({
      data: {
        email: session.user.email,
        name: session.user.name,
      }
    })
    return {
      props: {
        userName: session.user.name,
        userImage: session.user.image,
        currentPuzzle: 1,
        previousAnswers: []
      },
    }
  }

  return {
    props: {
      userName: session.user.name,
      userImage: session.user.image,
      currentPuzzle: participant.current_puzzle,
      previousAnswers: puzzleAnswers.slice(0, participant.current_puzzle - 1)
    },
  }
}

interface props {
  userName: string,
  userImage: string,
  currentPuzzle: number,
  previousAnswers: string[],
}

export default function Home({ userName, userImage, currentPuzzle, previousAnswers }: props) {

  const inputField = useRef<HTMLInputElement>(null);
  const puzzlesContainer = useRef<HTMLDivElement>(null);

  const handleSubmitAnswer = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const request = {
      puzzleId: currentPuzzle,
      answer: inputField.current!.value
    };

    fetch("/api/validateAnswer", {
      method: "POST",
      body: JSON.stringify(request),
    }).then(data => data.json())
      .then(data => data.isAnswerCorrect)
      .then(isAnswerCorrect => {
        // TODO: handle popup
        if (isAnswerCorrect) {
          window.location.reload();
        } else {
          console.log("Wrong!");
        }
      })
  }


  useEffect(() => {
    // scroll to last clue after 3 second
    setTimeout(() => {
      puzzlesContainer.current!.scrollTo(puzzlesContainer.current!.scrollWidth, 0);
    }, 3000);
  }, [])


  return (
    <>
      <div id={styles.home}>
        <span id={styles.title}> Queue Our Codes </span><br />
        <div className={styles.HomeContainer} id={styles.UserContainer}>
          <div id={styles.UserContainerInner}>
            <Image id={styles.userpic} src={userImage} width={32} height={32} alt="Picture of the user" />
            <span id={styles.username}>{userName}</span>
          </div>
          <Image id={styles.logout} src="/logout.svg" width={25} height={25} alt="Picture of the user" onClick={() => signOut()} />
        </div>

        <div id={styles.PuzzlesContainer} ref={puzzlesContainer}>
          {
            Array.from({length: currentPuzzle}, (_, i) => i + 1)
                 .map((i) => {
                   return (
                    <div className={styles.PuzzleCard}>
                      <div className={styles.HomeContainer} id={styles.ClueContainer}>
                        <span id={styles.cluenum}> Clue #{i} </span>
                        <Puzzle puzzleId={i} />
                        {
                          i === currentPuzzle 
                            ? 
                            <div className={styles.HomeContainer} id={styles.InputContainer}>
                              <input ref={inputField} id={styles.InputField} type="text" placeholder="Answer" />
                              <Image id={styles.SubmitButtonImage} src="submit.svg" alt="Picture of the user" width={25} height={25} onClick={handleSubmitAnswer} />
                            </div>
                            :  
                            <div className={styles.HomeContainer} id={styles.InputContainer}>
                              <input id={styles.InputField} type="text" placeholder={`Answer for #${i} is ${previousAnswers[i-1]}`} disabled />
                            </div>
                        }
                      </div>
                    </div>
                   )
                } 
            )
          }
        </div>

        <div className={styles.ProgressBar}>
          <div className={styles.Progress} style={{ width: `calc((${currentPuzzle}/ 10) * 100% - 4px)` }}></div >
        </div>
        <div className={styles.Footer}>COMSCI@UP.BAG 2023</div>
      </div>

      <div className={styles.cover}>
        <div className={styles.circle} />
      </div>

    </>
  )
}
