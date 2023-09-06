import { NextResponse } from "next/server";
import { prisma } from "@/db";

export async function POST(request) {
  try {
    const { exercise, lbs, reps } = await request.json();
    // await Workout.create({ exercise, lbs, reps });
    // return NextResponse.json(
    //   {
    //     message: "Workout Created",
    //   },
    //   {
    //     status: 201,
    //   },
    // );
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Failed to create workout.",
    });
  }
}

export async function GET() {
  try {
    // const workouts = await Workout.find().sort({ _id: -1 });
    // return NextResponse.json({ workouts });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Failed to get workout.",
    });
  }
}

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    // await Workout.findByIdAndDelete(id);
    // return NextResponse.json({ message: "Workout deleted" }, { status: 200 });
    const deleteWorkout = await prisma.workout.delete({ where: { id } });
    return NextResponse({ message: "Workout deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Failed to get workout.",
    });
  }
}
