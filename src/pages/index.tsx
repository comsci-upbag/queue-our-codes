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
    setScroll((container.current!.scrollLeft / container.current!.scrollWidth) * 100 || 0);
  }

  return <>
    <div className={styles.container} ref={container} onScroll={handleScroll}>
      <div className={styles.page}>
        <h1 className={styles.title}>Welcome to the 2023 Virtual Puzzle Hunt!</h1>
        <p className={styles.description}>
          This is a virtual puzzle hunt brought to you by COMSCI@UP.BAG.<br /><br />
          To get started, please login with your Google account.
        </p>
      </div>
      <div className={styles.page}>
        <Image src="/logo.svg" alt="logo" width={100} height={100} />
        <br />
        <span className={styles.LoginTitle}> Queue Our Codes </span><br />
        <div className={styles.LoginButton} onClick={() => signIn("google")}>
          Sign in with Google
          <Image src="/googleIcon.svg" className={styles.Google} alt="google-icon" width={25} height={25} />
        </div>
      </div>
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
