"use server";
import prisma from "@/db";
import { WorkoutSession } from "@/types";
import { updateWorkoutWithDate } from ".";

export const updateManyWorkoutsDate = async (
  session: WorkoutSession,
  date: string,
) => {
  try {
    session.Workout.map(async ({ id, sets, lbs, reps }) => {
      await updateWorkoutWithDate(id, sets, lbs, reps, date);
    });
    await prisma.workoutSession.update({
      where: { id: session.id },
      data: { createdAt: date },
    });
  } catch (error) {
    console.log("Error updating workout date: ", error);
  }
};
