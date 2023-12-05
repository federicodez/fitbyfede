"use server";
import prisma from "@/db";
import { getCurrentUser } from "../users/getCurrentUser";

export const addMeasurement = async () => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return null;
    }
  } catch (error) {
    console.log("Failed to add measurement ", error);
  }
};
