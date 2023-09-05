import { NextResponse } from "next/server";
import { prisma } from "@/db";

export async function GET() {
  try {
    // const workout = await Workout.find().sort({ _id: -1 }).limit(1);
    // return NextResponse.json({ workout });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Failed to get workout.",
    });
  }
}
