import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import { User } from "@/models/index";

export async function POST(req) {
  try {
    const { email, name } = await req.json();
    await connectMongoDB();
    await User.create({ email, name });

    return NextResponse.json({ message: "User Registered" }, { status: 201 });
  } catch (error) {
    console.log(error);
  }
}
