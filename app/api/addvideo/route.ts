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
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    let dbResponse = await prisma.video.create({
      data: {
        video: body.videourl,
        user: {
          connect: { id: user?.id },
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
