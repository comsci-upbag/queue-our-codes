import { useSession, signIn, signOut } from "next-auth/react"
import styles from "@/styles/Home.module.css"

export default function LoginPage() {
    const { data: session } = useSession()
    if (session) {
        return (
            <>
                Signed in as {session.user.address} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }
    return (
        <>
            <div className = {styles.LoginContainer}>
                <span id = {styles.title}> Queue Our Codes </span><br />
                <span id = {styles.user}> Not signed in </span> <br />
                <button onClick={() => signIn("google")}>Sign in with Google</button>
            </div>
        </>
    )
}