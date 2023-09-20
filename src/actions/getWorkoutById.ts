import prisma from "@/db";

export const getWorkoutById = async (id: string) => {
  try {
    const workout = await prisma.workout.findUnique({ where: { id: id } });
    return workout;
  } catch (error) {
    console.log(error);
  }
};
