import prisma from "@/db";
import { NextResponse } from "next/server";

export const POST = async (req: any) => {
  const { email } = await req.json();

  const existingUser = await prisma.user.findUnique({ where: email });

  if (!existingUser) {
    return new NextResponse("Email doesn't exist.", { status: 400 });
  }
};
