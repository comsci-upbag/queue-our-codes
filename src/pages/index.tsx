import Image from "next/image"

import { getSession } from "next-auth/react"
import { NextPageContext } from "next";

import { signIn } from "next-auth/react"

import { useRef, useState } from "react";

import styles from "@/styles/Index.module.css"

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session)
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    }

  return {
    props: {}
  }
}

export default function Index() {
  const container = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState(0);

  function handleScroll() {
    setScroll(container.current!.scrollLeft / (container.current!.scrollWidth - container.current!.clientWidth));
  }

  function scrollNext() {
    container.current!.scrollTop = 0;
    container.current!.scrollBy({
      left: container.current!.clientWidth,
      behavior: "smooth"
    });
  }

  function scrollPrev() {
    container.current!.scrollTop = 0;
    container.current!.scrollBy({
      left: -container.current!.clientWidth,
      behavior: "smooth"
    });
  }

  return <>
    <div className={styles.container} ref={container} onScroll={handleScroll}>
      <div className={styles.page}>
        <br />
        <h1 className={styles.title}>Welcome to Queue Our Codes!</h1>
        <br />
        <p className={styles.description}>
          Queue Our Codes is a mystery game where the participants need to solve puzzles and collect clues in order to uncover the secret behind UP Baguio’s clowder of cats and a certain fried chicken.
        </p>
      </div>
      <div className={styles.page}>
        <br />
        <h1 className={styles.title}>Prizes</h1>
        <br />
        <p className={styles.description}>
          The first team to solve the mystery will win a prize of 500 pesos. The second team will win a prize of 300 pesos. The third team will win a prize of 200 pesos. For the rest of the teams, the first 10 to complete the puzzle will receive stickers as consolation prize.
        </p>
      </div>
      <div className={styles.page}>
        <br />
        <h1 className={styles.title}>Rules</h1>
        <br />
        <p className={styles.description}>
          Disclaimer: This game requires participants to log in using their Google accounts. The members of the organization assure all participants that this is for verification purposes only and that no other information related to the account will be retrieved aside from the account name. By scanning this QR Code, the participant consents to their name being collected for this game. All information will be deleted once the game officially ends.
        </p>
        <br />
        <ul className={styles.rules} style={{
          marginLeft: "10%",
        }}>
          <li>The game can be started immediately and discontinued at any point in time. We advise participants to bookmark or note the link to the site in case they choose to continue it at a later time. </li>
          <br />
          <li>The game will end at exactly 5:00 PM on February 16, 2023. Access to the site will be restricted beyond this point in time. We recommend that participants keep this in mind so their efforts will not be wasted.</li>
          <br />
          <li>Specific instructions for each puzzle will be given on the site itself. In case of a clarification or unexpected errors in accessing the site, the participants may ask for assistance through the COMSCI@UP.BAG Booth.</li>
          <br />
          <li>Some puzzles may require interaction with some of the cats on campus. However, we remind everyone to refrain from directly touching or getting very near the cats. All interactions may be done at a safe distance without disturbing the cats.</li>
          <br />
          <li>The organization has the discretion to disqualify a participant in case it has been proven that the participant cheated in any form during the game. Searching the internet is allowed except for puzzles that require images. These will be verified once the participant finishes all the puzzles.</li>
          <br />
          <li>We wish all the participants to enjoy the game! We recommend counting the times the cats *meow* as it may have its use in the future. Good luck!</li>
          <br />
        </ul>
        <br />
      </div>
      <div className={styles.page}>
        <br />
        <h1 className={styles.title}>FAQ</h1>
        <br />
        <p className={styles.description}>
          <b>Q: What is the game about?</b><br /><br />
          A: The game is a mystery game where the participants need to solve puzzles and collect clues in order to uncover the secret behind UP Baguio’s clowder of cats and a certain fried chicken.<br /><br />
          <b>Q: Can anyone play this game?</b><br /><br />
          A: Yes! Anyone can play this game as long as they have a Google account.<br /><br />
          <b>Q: When will the game start and until when will it be open?</b> <br /><br />
          A: The event will start on February 15, 2023, at 9:00 AM and end on February 15, 2023, at 5:00 PM.<br /><br />
          <b>Q: What should I do to participate in this event?</b><br /><br />
          A: Participants will be required to pay 10 pesos for the registration fee.<br /><br />
          <b>Q: What will be the prize for the winning participants?</b><br /><br />
          A: The first, second and third participants will win 500, 300 and 200 pesos respectively. The 10 succeeding participants will then be awarded by stickers courtesy of the COMSCI@UPBAG organization.<br /><br />
          <b>Q: How will the winners be determined?</b><br /><br />
          A: The winners will be determined based on the least time it has taken them to finish.<br /><br />
          <b>Q: How many winners will be awarded?</b><br /><br />
          A: The first three participants who will complete the game will receive special prizes but there will be a consolation prize for everyone who also completes it.<br /><br />
          <b>Q: Do I need to know Computer Science concepts to finish this puzzle?</b><br /><br />
          A: Although knowing a few Computer Science lessons would help in the completion of the game, no specialized knowledge in the subject is required to finish it.<br /><br />
          <b>Q: Can I and my friends join as a group?</b><br /><br />
          A: Yes! However, the prize will only be given to the person whose Google account is registered in the game. The organization is not responsible for the distribution of prizes among the members of the group.<br /><br />
        </p>
      </div>
      <div className={styles.page}>
        <br />
        <Image src="/logo.svg" alt="logo" width={100} height={100} />
        <br />
        <span className={styles.LoginTitle}> Queue Our Codes </span><br />
        <div className={styles.LoginButton} onClick={() => signIn("google")}>
          Sign in with Google
          <Image src="/googleIcon.svg" className={styles.Google} alt="google-icon" width={25} height={25} />
        </div>
      </div>
    </div>
    <div id={styles.NavigationContainer}>
      <button onClick={scrollPrev}> &lt; PREV </button>
      <button onClick={scrollNext}> NEXT &gt; </button>
    </div>
    <div className={styles.ProgressBar}>
      <div className={styles.Progress} style={{ width: `calc((${scroll} * 100%) - 4px)` }}></div >
    </div>
    <div className={styles.Footer}>COMSCI@UP.BAG 2023</div>
    <div className={styles.cover}>
      <div className={styles.circle} />
    </div>
  </>
}
