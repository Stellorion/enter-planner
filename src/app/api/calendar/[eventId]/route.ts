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
      return NextResponse.json(
        { error: "You must be signed in to update events" }, 
        { status: 401 }
      );
    }

    const { eventId: eventIdString } = await context.params;
    const eventId = Number(eventIdString);
    
    if (isNaN(eventId)) {
      return NextResponse.json(
        { error: "Invalid event ID format" }, 
        { status: 400 }
      );
    }

    const userCalendar = await db.calendar.findUnique({
      where: { userId: parseInt(session.user.id) },
      include: { events: true },
    });

    const eventExists = userCalendar?.events.some(event => event.id === eventId);
    if (!eventExists) {
      return NextResponse.json(
        { error: "You don't have permission to update this event" }, 
        { status: 404 }
      );
    }

    const body = await req.json();
    const { title, start, end, allDay, notes, color } = body;

    const event = await db.event.update({
      where: { id: eventId },
      data: {
        title,
        start: new Date(start),
        end: end ? new Date(end) : null,
        allDay,
        notes,
        color,
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
      return NextResponse.json(
        { error: "You must be signed in to delete events" }, 
        { status: 401 }
      );
    }

    const { eventId: eventIdString } = await context.params;
    const eventId = Number(eventIdString);
    
    if (isNaN(eventId)) {
      return NextResponse.json(
        { error: "Invalid event ID format" }, 
        { status: 400 }
      );
    }

    const userCalendar = await db.calendar.findUnique({
      where: { userId: parseInt(session.user.id) },
      include: { events: true },
    });

    const eventExists = userCalendar?.events.some(event => event.id === eventId);
    if (!eventExists) {
      return NextResponse.json(
        { error: "You don't have permission to delete this event" }, 
        { status: 404 }
      );
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