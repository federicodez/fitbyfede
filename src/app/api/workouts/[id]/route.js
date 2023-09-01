import connectMongoDb from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Workout from "@/models/workout";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const {
      newExercise: exercise,
      newLbs: lbs,
      newReps: reps,
    } = await request.json();
    await connectMongoDb();
    await Workout.findByIdAndUpdate(id, { exercise, lbs, reps });
    return NextResponse.json({ message: "Workout updated" }, { status: 200 });
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
    await connectMongoDb();
    const workout = await Workout.findOne({ _id: id });
    return NextResponse.json({ workout }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Failed to get specific workout.",
    });
  }
}
