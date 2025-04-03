import { authOptions } from "@/auth"
import Calendar from "@/src/views/CalendarViews/Calendar"
import { getServerSession } from "next-auth"
import { SessionProvider } from "next-auth/react"

export default async function CalendarPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return (
      <Calendar />
    )
  }

  return (
    <div className="min-h-screen">
      <Calendar />
    </div>
  )
}