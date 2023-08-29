import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import Workout from "@/models/workout";

export async function POST(request) {
  const { exercise, lbs, sets, reps } = await request.json();
  await connectMongoDB();
  await Workout.create({ exercise, lbs, sets, reps });
  return NextResponse.json({ message: "Workout Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const workouts = await Workout.find();
  return NextResponse.json({ workouts });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Workout.findByIdAndDelete(id);
  return NextResponse.json({ message: "Workout deleted" }, { status: 200 });
}
