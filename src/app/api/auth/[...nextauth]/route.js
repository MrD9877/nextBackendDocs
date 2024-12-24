import dbConnect from "@/app/lib/dbConnect";
import { User } from "@/model/user";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        dbConnect();
        try {
          const user = await User.findOne({
            $or: [{ username: credentials.identifier }, { email: credentials.identifier }],
          });
          if (!user) {
            throw new Error("No user found");
          }
          if (user.password !== credentials.password) {
            throw new Error("Password does not match");
          }
          return user;
        } catch (err) {
          throw new Error(err);
        }
      },

      pages: {
        signIn: "/signin",
        signOut: "/auth/signout",
        error: "/auth/error",
        verifyRequest: "/auth/verify-request",
        newUser: null,
      },
      session: {
        strategy: "jwt",
      },
      secret: "secret",
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.token = "token";
      }
      return session;
    },
    async jwt({ token, user }) {
      console.log(user);
      if (user) {
        token.accessToken = user.accessToken;
        token.username = user.username;
      }
      return { ...token, ...user };
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
