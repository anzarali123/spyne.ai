import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/index";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_OPTIONS } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { user: payload } = await getServerSession(NEXT_AUTH_OPTIONS);
    if (!payload && !payload?.userId) {
      return NextResponse.json({ success: false }, { status: 411 });
    }
    await prisma.caption.create({
      data: {
        caption: body.caption,
        startTime: body.startTime,
        endTime: body.endTime,
        video: {
          connect: { id: Number(body.videoid) },
        },
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "An error occurred while updating the user" },
      { status: 500 }
    );
  }
}
