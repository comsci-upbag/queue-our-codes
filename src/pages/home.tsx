
import Image from "next/image"

import { signOut, getSession } from "next-auth/react"
import { NextPageContext } from "next";

import styles from "@/styles/Home.module.css"
import PuzzleContainer from "@/components/PuzzleContainer"

import { prisma } from "@/globals/prisma"

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  const { textAnswers } = await import( "@/globals/answers");

  const previousAnswers = textAnswers.map(answer => answer.answer);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

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
      previousAnswers: previousAnswers.slice(0, participant.current_puzzle - 1)
    },
  }
}

interface props {
  userName: string,
  userImage: string,
  currentPuzzle: number,
  previousAnswers: string[],
}

export default function Home({ currentPuzzle, previousAnswers, userName, userImage }: props) {


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
        <PuzzleContainer currentPuzzle={currentPuzzle} previousAnswers={previousAnswers}/>
      </div>

      <div className={styles.cover}>
        <div className={styles.circle} />
      </div>

    </>
  )
}
