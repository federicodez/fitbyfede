import prisma from "@/db";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { token } = await request.json();

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await prisma.user.findMany({
    where: {
      resetToken: hashedToken,
      resetTokenExpiry: {
        gte: Date.now(),
      },
    },
  });

  if (!user) {
    return new NextResponse("Invalid token or has expired.", { status: 400 });
  }

  return new NextResponse(JSON.stringify(user), { status: 200 });
}
