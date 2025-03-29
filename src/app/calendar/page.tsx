import { authOptions } from "@/auth"
import Calendar from "@/src/views/CalendarViews/Calendar"
import { getServerSession } from "next-auth"
import { SessionProvider } from "next-auth/react"

export default async function CalendarPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl">Please sign in to view the calendar</h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Calendar />
    </div>
  )
}