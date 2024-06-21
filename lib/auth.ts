import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/db";
import bcrypt from "bcrypt";

export const NEXT_AUTH_OPTIONS = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter password",
        },
      },
      //@ts-ignore
      async authorize(credentials: any) {
        console.log(credentials, "credentials");
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) {
          return null;
        }
        const passwordValidation = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!passwordValidation) return null;
        return {
          userId: user?.id,
          name: user?.name,
          email: user?.email,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.userId = user.userId;
      }
      return token;
    },
    async session({ session, token, user }: any) {
      if (session && session.user) {
        session.user.userId = token.userId;
      }
      return session;
    },
  },
};
