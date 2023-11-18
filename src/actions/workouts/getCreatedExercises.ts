"use server";
import prisma from "@/db";
import { getCurrentUser } from "../users/getCurrentUser";

export const getCreatedExercises = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return null;
    }

    const workouts = await prisma.exercise.findMany({
      where: { userId: currentUser.id },
    });

    if (!workouts) {
      return null;
    }
    return workouts;
  } catch (error) {
    console.log("Error loading created exercises ", error);
  }
};
