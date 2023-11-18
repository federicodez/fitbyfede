"use server";
import prisma from "@/db";

export const getSessionById = async (sessionId: string) => {
  try {
    const session = await prisma.workoutSession.findUnique({
      where: { id: sessionId },
      include: { Workout: true },
    });
    return session;
  } catch (error) {
    console.log("Error loading session ", error);
  }
};
