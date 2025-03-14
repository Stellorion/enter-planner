import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db/connect";
import { compare } from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";

interface Credentials {
  email: string;
  password: string;
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as Credentials;

        if (!email || !password) {
          throw new Error("Missing credentials");
        }

        const user = await db.user.findUnique({
          where: { email },
          select: { id: true, name: true, email: true, password: true },
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        const passwordMatches = await compare(password, user.password);
        if (!passwordMatches) {
          throw new Error("Invalid credentials");
        }

        return { id: user.id.toString(), name: user.name, email: user.email };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
});

export const handlers = {
  GET: async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json({ message: "GET request handled" });
  },
  POST: async (req: NextApiRequest, res: NextApiResponse) => {
    console.log("Request body:", req.body);
    res.status(200).json({ message: "POST request handled" });
  },
};

