"use server";
import prisma from "@/db";
import { getCurrentUser } from "../users/getCurrentUser";

export const createMeasurement = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return null;
    }

    const measurement = await prisma.measurements.create({
      data: {
        age: 0,
        height: 0,
        weight: [0],
        upperArm: [0],
        lowerArm: [0],
        upperLeg: [0],
        lowerLeg: [0],
        chest: [0],
        abdominal: [0],
        userId: currentUser.id,
      },
    });

    if (!measurement) {
      return null;
    }
    return measurement;
  } catch (error) {
    console.log("Failed to add measurement ", error);
  }
};
