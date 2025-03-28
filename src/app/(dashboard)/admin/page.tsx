import { authOptions } from '@/auth'
import { getServerSession } from 'next-auth'

const page = async () => {
    const session = await getServerSession(authOptions)

    if (session?.user) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <h2>Welcome to Admin {session?.user.firstName} {session?.user.lastName}</h2>
            </div>
        )
    }
    
    return (
        <div className="min-h-screen flex justify-center items-center">
            <h2>Please login to see this page</h2>
        </div>
    )
}

export default page