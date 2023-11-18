"use server";
import prisma from "@/db";
import { Workout } from "@/types";
import { getCurrentUser } from "../users/getCurrentUser";

export const getPreviousWorkout = async (workouts: Workout[]) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return null;
    }

    const result: any[] = [];
    for (let i = 0; i < workouts.length; i++) {
      const previous = await prisma.workout.findFirst({
        where: {
          userId: currentUser.id,
          name: workouts[i].name,
          NOT: { id: workouts[i].id },
        },
        orderBy: { createdAt: "desc" },
      });

      result.push(previous);
    }

    if (!result.length) {
      return null;
    }

    return result;
  } catch (error) {
    console.log("Error loading previous workouts ", error);
  }
};
