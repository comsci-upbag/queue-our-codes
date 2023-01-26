
import { useSession, signOut } from "next-auth/react"
import styles from "@/styles/Home.module.css"
import Image from "next/image"
import logoutImage from "../images/logout.svg"
import enterImage from "../images/enter.svg"

export default function HomePage() {
  const { data: session } = useSession();

  if (!session) return <></>;

  const userName = session!.user.name;
  const userImage = session!.user.image.replaceAll("s96-c", "s192-c");

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
          <Image id={styles.logout} src={logoutImage} alt="Picture of the user" onClick={() => signOut()} />
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
          <Image id={styles.SubmitButtonImage} src={enterImage} alt="Picture of the user" onClick={() => console.log("button click")} />
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
