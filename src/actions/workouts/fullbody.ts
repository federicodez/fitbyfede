"use server";
import prisma from "@/db";
import { getCurrentUser } from "../users/getCurrentUser";

export const fullBody = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return null;
    }

    const previous = await prisma.workout.findFirst({
      where: {
        userId: currentUser.id,
        bodyPart: "upper legs",
        OR: [{ bodyPart: "chest" }, { bodyPart: "upper back" }],
      },
      orderBy: { createdAt: "desc" },
    });

    if (!previous) return null;

    return previous;
  } catch (error) {
    console.log("Error loading previous workouts ", error);
  }
};
