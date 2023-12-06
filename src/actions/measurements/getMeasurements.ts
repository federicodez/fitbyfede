"use server";
import prisma from "@/db";
import { getCurrentUser } from "../users/getCurrentUser";

export const getMeasurements = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return null;
    }

    const measurements = await prisma.measurements.findMany({
      where: { userId: currentUser.id },
    });

    if (!measurements) {
      return null;
    }
    return measurements;
  } catch (error) {
    console.log("Failed to retrieve measurements ", error);
  }
};
