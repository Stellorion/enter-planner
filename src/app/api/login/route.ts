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