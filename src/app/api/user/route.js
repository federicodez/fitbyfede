import { NextResponse } from "next/server";
import { prisma } from "@/db";

export async function POST(req) {
  try {
    const { email, name } = await req.json();
    const user = await prisma.user.create({ data: { email, name } });

    return NextResponse.json(
      { data: user },
      { message: "User Registered" },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
  }
}
