"use server";
import prisma from "@/db";

export const updateWorkoutSession = async (
  id: string,
  name: string,
  notes: string,
  time: number,
) => {
  try {
    if (notes) {
      await prisma.workoutSession.update({
        where: { id },
        data: { name: name, time: time, notes: notes },
      });
    } else {
      await prisma.workoutSession.update({
        where: { id },
        data: { name: name, time: time },
      });
    }
  } catch (error) {
    console.log("Error updating session ", error);
  }
};
