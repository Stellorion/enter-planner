import { NextResponse } from "next/server";
import { db } from "@/db/connect";
import { hashFunction, compareFunction } from "@/utils/hashFunction";
import * as z from "zod";

const userSchema = z.object({
  email: z.string().email().min(1, "Email is Required"),
  firstName: z
    .string()
    .min(1, "First Name is Required")
    .max(20, "First Name must be less than 20 characters long"),
  lastName: z
    .string()
    .min(1, "Last Name is Required")
    .max(20, "Last Name must be less than 20 characters long"),
  password: z
    .string()
    .min(1, "Password is Required")
    .min(8, "Password must be at least 8 characters long"),
});


export async function POST(req: Request){
  try {
    const body = await req.json();
    const {email, firstName, lastName, password} = body;

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const existingUserByEmail = await db.user.findUnique({
      where : {email: email}
    })
    if (existingUserByEmail) {
      return NextResponse.json({error: 'Email already in use'}, {status: 400})
    }

    const hashedPassword = await hashFunction(password);

    const newUser = await db.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashedPassword,
      },
    })

    const { password: newUserPassword, ...rest } = newUser;
    return NextResponse.json(
      { user: rest, message: "User Created Successfully" }, 
      { status: 201 }
    )
  } catch(error) {
    console.error("Error in POST /api/login:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}