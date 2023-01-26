
import { useSession } from "next-auth/react"
import styles from "@/styles/Home.module.css"
import Image from "next/image"
import profilePic from "../images/dp.jpg"

export default function HomePage() {
  const { data: session } = useSession()

  return (
    <>
      <div id = {styles.home}>
        <span id = {styles.title}> Queue Our Codes </span><br />
        <div className = {styles.HomeContainer} id = {styles.UserContainer}>
          <div id = {styles.UserContainerInner}>
            <Image id = {styles.userpic} src={session!.user.image.replaceAll("s96-c", "s192-c")} alt="Picture of the user" width={32} height={32}/>
            <span id = {styles.username}>Ji Changmin 큐</span>
          </div>
          <Image id = {styles.userpic} src={profilePic} alt="Picture of the user"/>
        </div>
        <div className = {styles.HomeContainer} id = {styles.ClueContainer}>
            <span id = {styles.cluenum}> Clue #4 </span>
            <span id = {styles.cluecont}>
            To use me, break me <br /><br />
            I am in front, but you can’t see me <br /><br />
            By the Laws of Physics, what goes up but never goes down? <br /><br />
            I get bigger the more is taken away
            </span>
        </div>
        <div className = {styles.HomeContainer}>
            
        </div>
        <div className = {styles.Footer}>COMSCI@UP.BAG 2023</div>
      </div>
  </>
)

}