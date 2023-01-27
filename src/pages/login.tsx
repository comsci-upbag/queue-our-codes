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
    props: {}
  }
}

export default function Login() {

  return (
    <>
      <div className={styles.LoginContainer}>
      <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 400 400" fill="none">
        <g id="SVGRepo_bgCarrier" stroke-width="0"/>
        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
        <g id="SVGRepo_iconCarrier"> <path d="M209.202 314C295.069 302.118 353.793 218.418 308.045 135.024C251.513 31.9842 61.8269 106.438 76.8437 219.371C86.6957 293.444 213.097 315.568 234.512 236.857C238.297 222.936 236.714 157.821 218.141 153.168C216.406 152.73 194.202 175.825 184.417 175.825C176.731 175.825 159.616 137.959 141.484 175.825" stroke="#B796CC" stroke-opacity="0.9" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/> </g>
        </svg><br />
        <span id={styles.title}> Queue Our Codes </span><br />
        <div id={styles.LoginButton} onClick={() => signIn("google")}>
          Sign in with Google
          <Image src="/googleIcon.svg" id={styles.Google} alt="google-icon" width={25} height={25} />
        </div>
      </div>
      <div className={styles.Footer}>COMSCI@UP.BAG 2023</div>
      <div className={styles.cover}>
        <div className={styles.circle} />
      </div>
    </>
  )
}
