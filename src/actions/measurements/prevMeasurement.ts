"use server";
import prisma from "@/db";
import { getCurrentUser } from "../users/getCurrentUser";

export const getPrevMeasurment = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return null;
    }

    const measurements = await prisma.measurements.findMany({
      where: { userId: currentUser.id },
    });

    measurements.pop();

    return measurements[measurements.length - 1];
  } catch (error) {
    console.log("Error loading previous workouts ", error);
  }
};
