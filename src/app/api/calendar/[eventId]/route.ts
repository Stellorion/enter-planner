import { NextResponse } from "next/server";
import { db } from "@/db/connect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export async function PUT(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, start, end, allDay, notes } = body;

    const event = await db.event.update({
      where: { id: parseInt(params.eventId) },
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
  { params }: { params: { eventId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await db.event.delete({
      where: { id: parseInt(params.eventId) },
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