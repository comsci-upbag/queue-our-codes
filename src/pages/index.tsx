

import { getSession } from "next-auth/react"
import { NextPageContext } from "next";

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
    redirect: {
      destination: '/home',
      permanent: false,
    },
  }
}


export default function Index() {
  return <></>
}
