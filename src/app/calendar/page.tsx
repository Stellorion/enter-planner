import { authOptions } from "@/auth"
import Calendar from "@/src/views/CalendarViews/Calendar"
import { getServerSession } from "next-auth"
import { SessionProvider } from "next-auth/react"

const session = await getServerSession(authOptions)

const page = () => {
  return (
    <Calendar />
  )
}

export default page