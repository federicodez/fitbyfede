"use server";
import prisma from "@/db";
import { getSessionById } from ".";

export const updateWorkout = async (
  id: string,
  sets: string[],
  lbs: number[],
  reps: number[],
  notes?: string,
) => {
  try {
    const lastSet = sets[sets.length - 1];
    if (!!Number(lastSet)) {
      const set = Number(lastSet) + 1;
      sets.push(String(set));
    } else {
      sets.push("1");
    }

    lbs.push(0);
    reps.push(0);
    const updated = await prisma.workout.update({
      where: {
        id,
      },
      data: {
        sets,
        lbs,
        reps,
        notes,
      },
    });

    const session = await getSessionById(updated.workoutSessionId);

    if (!session) {
      return null;
    }
    return session;
  } catch (error) {
    console.log("Error updating workout: ", error);
  }
};
