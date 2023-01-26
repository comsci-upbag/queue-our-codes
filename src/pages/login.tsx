import Image from "next/image"

import { signIn } from "next-auth/react"
import styles from "@/styles/Login.module.css"

import { getSession } from "next-auth/react"
import { NextPageContext } from "next";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    }
  }

  return {
    props: { }
  }
}

export default function Login() {

  return (
    <>
      <div className={styles.LoginContainer}>
          <span id={styles.title}> Queue Our Codes </span><br />
          <div id={styles.LoginButton} onClick={() => signIn("google")}>
              Sign in with Google
          </div>
          <Image src="/googleIcon.svg" id={styles.Google} alt="google-icon" width={25} height={25} />
      </div>
      <div className={styles.Footer}>COMSCI@UP.BAG 2023</div>
      <div className={styles.cover}>
          <div className={styles.circle}/>
      </div>
    </>
  )
}
