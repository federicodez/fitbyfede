import { connectMongoDb, disconnectMongoDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Workout from "@/models/workout";

export async function PUT(request, { params }) {
  const { id } = params;
  const {
    newExercise: exercise,
    newLbs: lbs,
    newReps: reps,
  } = await request.json();
  await connectMongoDb();
  await Workout.findByIdAndUpdate(id, { exercise, lbs, reps });
  await disconnectMongoDB();
  return NextResponse.json({ message: "Workout updated" }, { status: 200 });
}

export async function GET({ params }) {
  const { id } = params;
  await connectMongoDb();
  const workout = await Workout.findOne({ _id: id });
  await disconnectMongoDB();
  return NextResponse.json({ workout }, { status: 200 });
}
