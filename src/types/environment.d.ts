
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_GOOGLE_ID: string,
      NEXT_PUBLIC_GOOGLE_SECRET: string,
      SECRET: string,
    }
  }
}

export {}
