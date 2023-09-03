import connectMongoDb from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Workout from "@/models/workout";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { lbs, reps } = await request.json();
    await connectMongoDb();
    await Workout.updateOne({ _id: id }, { $push: { lbs, reps } });
    return NextResponse.json({ message: "Workout updated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Failed to update workout.",
    });
  }
}
