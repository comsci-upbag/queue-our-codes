import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  // https://github.com/nextauthjs/next-auth/issues/3245
  secret: process.env.SECRET,
}

export default NextAuth(authOptions)
