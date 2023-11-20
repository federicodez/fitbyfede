"use server";
import prisma from "@/db";

export const updateWorkoutWithDate = async (
  id: string,
  sets: string[],
  lbs: number[],
  reps: number[],
  date: string,
) => {
  try {
    const updated = await prisma.workout.update({
      where: {
        id,
      },
      data: {
        sets,
        lbs,
        reps,
        createdAt: new Date(date),
      },
    });
    return updated;
  } catch (error) {
    console.log("Error updating workout date: ", error);
  }
};
