"use server";
import prisma from "@/db";
import { getCurrentUser } from "../users/getCurrentUser";

export const getRecentMeasurement = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return null;
    }

    const measurements = await prisma.measurements.findFirst({
      where: { userId: currentUser.id },
      orderBy: { createdAt: "desc" },
    });

    return measurements;
  } catch (error) {
    console.log("Failed to retrieve measurements ", error);
  }
};
