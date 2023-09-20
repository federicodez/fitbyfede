import prisma from "@/db";
import { getCurrentUser } from ".";

export const createWorkout = async (
  exercise: string,
  lbs: number[],
  reps: number[],
) => {
  const currentUser = await getCurrentUser();
  if (!currentUser?.id) {
    return [];
  }

  try {
    const workout = await prisma.workout.create({
      data: {
        exercise: exercise,
        lbs: lbs,
        reps: reps,
        userId: currentUser.id,
      },
    });

    return workout;
  } catch (error: any) {
    console.log(error);
  }
};
