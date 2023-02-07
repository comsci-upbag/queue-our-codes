
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GOOGLE_ID: string,
      GOOGLE_SECRET: string,
      SECRET: string,
      DEPLOYMENT: string,
      IMAGE_VALIDATION_SERVER: string,
    }
  }
}

export {}
