import { NextResponse } from 'next/server';
import { hashFunction } from '../../../../utils/hashFunction';
import { db } from '../../../../db/connect';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received body:', body);

    const { firstName, lastName, email, password } = body;

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
    }

    const hashedPassword = await hashFunction(password);
    console.log('Hashed password:', hashedPassword);

    const user = await db.user.create({
      data: {
        name: firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    console.log('User created successfully:', user);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error('🔥 Error in /api/register:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}