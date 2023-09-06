import { NextResponse } from "next/server";
import { prisma } from "@/db";

export async function POST(req, { params }) {
  try {
    const { id } = params;
    const { exercise } = await req.json();

    await prisma.workout.create({
      data: {
        exercise,
        userId: id,
      },
    });
    return NextResponse.json({ message: "Workout created" }, { status: 201 });
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { lbs, reps } = await request.json();
    // await Workout.findByIdAndUpdate(id, { lbs, reps });
    // return NextResponse.json({ message: "Workout updated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Failed to update workout.",
    });
  }
}

export async function GET(request, { params }) {
  try {
    const { id } = params;
    // const workout = await Workout.findOne({ _id: id });
    // return NextResponse.json({ workout }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Failed to get specific workout.",
    });
  }
}
