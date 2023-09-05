import { NextResponse } from "next/server";
import { prisma } from "@/db";

export async function POST(req) {
  try {
    const { email, name } = await req.json();
    // await User.create({ email, name });

    // return NextResponse.json({ message: "User Registered" }, { status: 201 });
  } catch (error) {
    console.log(error);
  }
}
