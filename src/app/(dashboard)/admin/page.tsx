import { authOptions } from '@/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

const page = async () => {
    const session = await getServerSession(authOptions)

    if (session?.user) {
        return <h2>Welcome to Admin {session?.user.firstName} {session?.user.lastName}</h2>
    }
    
  return (
    <h2>Please login to see this page</h2>
  )
}

export default page