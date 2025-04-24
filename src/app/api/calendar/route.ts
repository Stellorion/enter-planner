import { NextResponse } from "next/server";
import { db } from "@/db/connect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const calendar = await db.calendar.findUnique({
      where: { userId: parseInt(session.user.id) },
      include: { events: true },
    });

    if (!calendar) {
      const newCalendar = await db.calendar.create({
        data: {
          userId: parseInt(session.user.id),
          title: "My Calendar",
        },
      });
      return NextResponse.json({ events: [] });
    }

    return NextResponse.json({ events: calendar.events });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, start, end, allDay, notes, color } = body;

    const calendar = await db.calendar.findUnique({
      where: { userId: parseInt(session.user.id) },
    });

    if (!calendar) {
      return NextResponse.json(
        { error: "Calendar not found" },
        { status: 404 }
      );
    }

    const event = await db.event.create({
      data: {
        title,
        start: new Date(start),
        end: end ? new Date(end) : null,
        allDay,
        notes,
        calendarId: calendar.id,
        color: color || '#3788d8',
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}