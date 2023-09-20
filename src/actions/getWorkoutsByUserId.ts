import prisma from "@/db";
import { getCurrentUser } from ".";

export const getWorkoutsByUserId = async () => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id) {
      return null;
    }
    const workout = await prisma.workout.findMany({
      where: { userId: currentUser.id },
    });
    return workout;
  } catch (error) {
    console.log(error);
  }
};
