
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  session: {
    strategy: "jwt", // Switch to JWT-based sessions
    maxAge: 60 * 60, //1 hour
    updateAge: 60 * 30 //30 mins
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login", 
  },
})