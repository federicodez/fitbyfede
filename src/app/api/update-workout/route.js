import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import { Workout } from "@/models/index";

export async function GET() {
  try {
    await connectMongoDB();
    const workout = await Workout.find().sort({ _id: -1 }).limit(1);
    return NextResponse.json({ workout });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Failed to get workout.",
    });
  }
}
