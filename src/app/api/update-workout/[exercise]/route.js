import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import { Workout } from "@/models/index";

export async function POST(request, { params }) {
  const { exercise } = params;
  try {
    await connectMongoDB();
    await Workout.create({ exercise, lbs: 0, reps: 0 });
    return NextResponse.json({ message: "Workout Created" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Failed to create workout.",
    });
  }
}
