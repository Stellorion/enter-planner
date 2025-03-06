import { NextRequest, NextResponse } from 'next/server';
import { db } from '../../../../db/connect';
import { hashFunction } from '../../../../utils/hashFunction';

export async function POST(request: NextRequest) {
  const { userName, lastName, email, password } = await request.json();
  const tryTohash = await hashFunction(password);

    try{
        const tryToSendToDB = await db.user.create({
            data:{
                name:userName,
                email:email,
                password:tryTohash,
                //@ts-ignore
                lastName :lastName
            }
        })
        console.log(tryToSendToDB)
    }
    catch(error){
        console.log(error)
        return new Response(JSON.stringify('Error'), {
            status: 400,
          });
    }    
  return new Response(JSON.stringify('Ok'), {
    status: 200,
  });
  //fetch api/register
}
