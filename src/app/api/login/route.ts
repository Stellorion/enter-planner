// import { NextResponse } from 'next/server';
// import { compareFunction } from '../../../../utils/hashFunction';
// import { db } from '../../../../db/connect';

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { email, password } = body;

//     if (!email || !password) {
//       return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
//     }

//     // Find user by email
//     const user = await db.user.findUnique({ where: { email } });

//     if (!user) {
//       return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
//     }

//     // Compare password
//     const isPasswordValid = await compareFunction(password, user.password);

//     if (!isPasswordValid) {
//       return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
//     }

//     // TODO: Implement authentication (JWT or session)
//     return NextResponse.json({ message: 'Login successful', user:1 }, { status: 200 });

//   } catch (error) {
//     console.error('🔥 Error in /api/login:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import {signIn} from "@/auth" 
export async function POST(request: Request){
    const body = await request.json();
    const { email, password } = body;
 
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  } catch (error) {
  
    if (error) {
      switch (error) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
}