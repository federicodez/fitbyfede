"use server";
import prisma from "@/db";
import { getCurrentUser } from "../users/getCurrentUser";

export const getMostRecentWorkouts = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return null;
    }

    const workouts = await prisma.workout.findMany({
      take: 4,
      where: {
        userId: currentUser.id,
      },
      distinct: ["name"],
      orderBy: {
        createdAt: "desc",
      },
    });

    return workouts;
  } catch (err: any) {
    console.log("Error loading most recent workouts: ", err);
  }
};
