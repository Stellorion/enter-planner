import NextAuth from "next-auth";

import { authOptions } from "@/src/server/auth";

const { handlers } = NextAuth(authOptions);
export const { GET, POST } = handlers;