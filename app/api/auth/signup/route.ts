import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/index";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body, "body");
  const userExists = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  });
  console.log(userExists, "userexists");

  if (!userExists) {
    body.password = await bcrypt.hash(body.password, 10);
    const user = await prisma.user.create({
      data: body,
    });
    console.log(user, "user");
    return NextResponse.json({
      success: true,
    });
  } else {
    return NextResponse.json({
      success: false,
    });
  }
}
