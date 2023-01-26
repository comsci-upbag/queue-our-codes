import { useSession, signIn, signOut } from "next-auth/react"
import "@/styles/Home.module.css"

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
            <div className = "LoginContainer">
                Not signed in <br />
                <button onClick={() => signIn()}>Sign in</button>
            </div>
        </>
    )
}