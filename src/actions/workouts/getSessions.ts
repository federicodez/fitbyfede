"use server";
import prisma from "@/db";
import { getCurrentUser } from "../users/getCurrentUser";

export const getSessions = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return null;
    }

    const sessions = await prisma.workoutSession.findMany({
      where: { userId: currentUser.id },
      include: { Workout: true },
      orderBy: { createdAt: "desc" },
    });

    if (!sessions?.length) {
      throw new Error("Failed to fetch sessions");
    }

    return sessions;
  } catch (error) {
    console.log("Error fetching sessions ", error);
  }
};
