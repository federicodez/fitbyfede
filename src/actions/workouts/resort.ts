"use server";
import prisma from "@/db";
import type { Workout } from "@/types";

export const resort = async (dragBox: Workout, dropBox: Workout) => {
  try {
    const updatedDragged = await prisma.workout.update({
      where: { id: dragBox.id },
      data: { orderId: dropBox.orderId },
    });

    const updatedDropped = await prisma.workout.update({
      where: { id: dropBox.id },
      data: { orderId: dragBox.orderId },
    });

    if (!updatedDragged || !updatedDropped) return null;

    return [updatedDragged, updatedDropped];
  } catch (err) {
    console.log("Failed to resort ", err);
  }
};
