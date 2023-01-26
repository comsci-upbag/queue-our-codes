// import Head from 'next/head'
// import Image from 'next/image'
// import { Inter } from '@next/font/google'

import { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

import HomePage from "./HomePage"
import LoginPage from "./LoginPage"

// const inter = Inter({ subsets: ['latin'] })

export default function App() {
  const { data: session } = useSession()

  if (session)
    return <HomePage />

  return <LoginPage />
}
