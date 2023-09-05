import { NextResponse } from "next/server";
import { prisma } from "@/db";

export async function POST(request, { params }) {
  const { exercise } = params;
  try {
    // await Workout.create({ exercise, lbs: 0, reps: 0 });
    // return NextResponse.json({ message: "Workout Created" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Failed to create workout.",
    });
  }
}
