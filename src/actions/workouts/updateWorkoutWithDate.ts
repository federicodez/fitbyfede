"use server";
import prisma from "@/db";

export const updateWorkoutWithDate = async (id: string, date: string) => {
  try {
    const updated = await prisma.workoutSession.update({
      where: {
        id,
      },
      data: {
        createdAt: new Date(date),
      },
    });
    return updated;
  } catch (error) {
    console.log("Error updating workout date: ", error);
  }
};
