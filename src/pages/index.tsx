// import Head from 'next/head'
// import Image from 'next/image'
// import { Inter } from '@next/font/google'
// import styles from '@/styles/Home.module.css'

import { useState } from 'react'

import HomePage from "./HomePage"

// const inter = Inter({ subsets: ['latin'] })

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn)
    return <HomePage/>

  return (
    <h1> "hello there" </h1>
  )
}
