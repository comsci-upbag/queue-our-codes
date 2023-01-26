
import Image from "next/image"

import { signOut, getSession } from "next-auth/react"
import { NextPageContext } from "next";

import styles from "@/styles/Home.module.css"


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

  return {
    props: {
      userName: session.user.name,
      userImage: session.user.image
    },
  }
}

interface props {
  userName: string,
  userImage: string,
}

export default function Home({ userName, userImage } : props ) {

  var clueNum = 6;

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
        <div className={styles.HomeContainer} id={styles.ClueContainer}>
          <span id={styles.cluenum}> Clue #{clueNum} </span>
          <span id={styles.cluecont}>
            To use me, break me <br /><br />
            I am in front, but you can’t see me <br /><br />
            By the Laws of Physics, what goes up but never goes down? <br /><br />
            I get bigger the more is taken away
          </span>
        </div>
        <div className={styles.HomeContainer} id={styles.InputContainer}>
          <input id={styles.InputField} type="text" placeholder="Answer" />
          <Image id={styles.SubmitButtonImage} src="enter.svg" alt="Picture of the user" width={25} height={25} onClick={() => console.log("button click")} />
        </div>
        <div className={styles.ProgressBar}>
          <div className={styles.Progress} style={{ width: "calc(" + (clueNum / 10) * 100 + "% - 4px)" }}></div >
        </div>
        <div className={styles.Footer}>COMSCI@UP.BAG 2023</div>
      </div>

      <div className={styles.cover}>
        <div className={styles.circle} />
      </div>

    </>
  )
}
