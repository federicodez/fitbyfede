"use server";
import prisma from "@/db";
import { WorkoutSession } from "@/types";
import { updateWorkoutWithDate } from ".";

export const updateManyWorkoutsDate = async (
  session: WorkoutSession,
  date: string,
) => {
  try {
    session.Workout.map(async ({ id }) => {
      await updateWorkoutWithDate(id, date);
    });
    await prisma.workoutSession.update({
      where: { id: session.id },
      data: { createdAt: date },
    });
  } catch (error) {
    console.log("Error updating workout date: ", error);
  }
};
