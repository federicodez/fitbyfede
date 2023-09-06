import { NextResponse } from "next/server";
import { prisma } from "@/db";

export async function PUT(req, res) {
  const {
    params: { id },
  } = req;
  console.log(id);
  try {
    // const {lbs, reps} = await req.json()
    // const workout = await prisma.workout.findUnique({ where: { id } });
    // console.log(workout);

    return NextResponse.json({ message: "Workout Created" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Failed to create workout.",
    });
  }
}
