import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from '@/db/connect';
import { compareFunction } from '@/utils/hashFunction';

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'example@gmail.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;
      
        if (!email || !password) {
          return null;
        }
      
        const existingUserByEmail = await db.user.findUnique({
          where: { email },
        });
      
        if (!existingUserByEmail) {
          return null;
        }
      
        const passwordMatches = await compareFunction(password, existingUserByEmail.password);
      
        if (!passwordMatches) {
          return null;
        }
      
        return { 
          id: `${existingUserByEmail.id}`, 
          email: existingUserByEmail.email 
        };
      },
    }),
  ],
};

export default NextAuth(authOptions);