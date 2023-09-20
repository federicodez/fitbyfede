import prisma from "@/db";
import { getCurrentUser } from ".";

export const createExercise = async (exercise: string) => {
  const lbs = [0];
  const reps = [0];
  const currentUser = await getCurrentUser();
  if (!currentUser?.id) {
    return null;
  }

  try {
    const workout = await prisma.workout.create({
      data: {
        exercise: exercise,
        lbs,
        reps,
        userId: currentUser.id,
      },
    });

    return workout;
  } catch (error: any) {
    console.log(error);
  }
};
