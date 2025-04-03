import NextAuth from "next-auth"

interface UserBase {
  id: string
  email: string
  firstName: string
  lastName: string
  userRole: string
}

declare module "next-auth" {
  interface User extends UserBase {}

  interface Session {
    user: UserBase
  }
}

declare module "next-auth/jwt" {
  interface JWT extends UserBase {}
}