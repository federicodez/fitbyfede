"use server";
import prisma from "@/db";
import { getSessionById } from ".";

export const deleteWorkout = async (id: string) => {
  try {
    const deleted = await prisma.workout.delete({ where: { id } });
    const session = await getSessionById(deleted.workoutSessionId);
    if (!session) {
      return null;
    }
    return session;
  } catch (error) {
    console.log("Error deleting workout: ", error);
  }
};
