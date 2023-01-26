import { useSession } from "next-auth/react"
import Image from "next/image"

export default function HomePage() {
  const { data: session } = useSession()

  return (
    <>
      <h1> "Hi there" {session?.user.name} </h1>
      <Image src={session!.user.image.replaceAll("s96-c", "s192-c")} alt="Picture of the user" width={200} height={200} />
    </>
  )
}
