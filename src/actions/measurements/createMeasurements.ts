"use server";
import prisma from "@/db";
import { getCurrentUser } from "../users/getCurrentUser";

export const createMeasurement = async (
  age: number,
  height: string,
  weight: number,
  upperArm: number,
  lowerArm: number,
  upperLeg: number,
  lowerLeg: number,
  chest: number,
  abdominal: number,
) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return null;
    }

    const measurement = await prisma.measurements.create({
      data: {
        age,
        height,
        weight,
        upperArm,
        lowerArm,
        upperLeg,
        lowerLeg,
        chest,
        abdominal,
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
