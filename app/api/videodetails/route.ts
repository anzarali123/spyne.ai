import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/index";
import { getServerSession } from "next-auth";
import { NEXT_AUTH_OPTIONS } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const { user: payload } = await getServerSession(NEXT_AUTH_OPTIONS);
    if (!payload && !payload?.userId) {
      return NextResponse.json({ success: false }, { status: 411 });
    }
    const dbResponse = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        video: {
          select: {
            id: true,
            video: true,
            captions: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      dbResponse,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "An error occurred while updating the user" },
      { status: 500 }
    );
  }
}
