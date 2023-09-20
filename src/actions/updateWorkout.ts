import prisma from "@/db";

export const updateWorkout = async (
  id: string,
  lbs: number[],
  reps: number[],
) => {
  try {
    const updated = await prisma.workout.update({
      where: {
        id,
      },
      data: {
        lbs,
        reps,
      },
    });
    return updated;
  } catch (error) {
    console.log(error);
  }
};
