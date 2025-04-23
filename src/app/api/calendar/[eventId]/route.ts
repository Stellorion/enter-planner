import { NextResponse } from "next/server";
import { db } from "@/db/connect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function PUT(
  req: Request,
  context: { params: { eventId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { eventId: eventIdString } = await context.params;
    const eventId = Number(eventIdString);
    
    if (isNaN(eventId)) {
      return NextResponse.json({ error: "Invalid event ID" }, { status: 400 });
    }

    // First check if the event belongs to the user's calendar
    const userCalendar = await db.calendar.findUnique({
      where: { userId: parseInt(session.user.id) },
      include: { events: true },
    });

    const eventExists = userCalendar?.events.some(event => event.id === eventId);
    if (!eventExists) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const body = await req.json();
    const { title, start, end, allDay, notes } = body;

    const event = await db.event.update({
      where: { id: eventId },
      data: {
        title,
        start: new Date(start),
        end: end ? new Date(end) : null,
        allDay,
        notes,
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: { eventId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { eventId: eventIdString } = context.params;
    const eventId = Number(eventIdString);
    
    if (isNaN(eventId)) {
      return NextResponse.json({ error: "Invalid event ID" }, { status: 400 });
    }

    // Check if the event belongs to the user's calendar
    const userCalendar = await db.calendar.findUnique({
      where: { userId: parseInt(session.user.id) },
      include: { events: true },
    });

    const eventExists = userCalendar?.events.some(event => event.id === eventId);
    if (!eventExists) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    await db.event.delete({
      where: { id: eventId },
    });

    return NextResponse.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}