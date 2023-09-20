import prisma from "@/db";

export const deleteWorkout = async (id: string) => {
  try {
    await prisma.workout.delete({ where: { id } });
  } catch (error: any) {
    console.log(error);
  }
};
