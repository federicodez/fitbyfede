"use server";
import prisma from "@/db";
import { getSessionById } from ".";

export const deleteSet = async (
  id: string,
  sets: string[],
  lbs: number[],
  reps: number[],
  setId: number,
) => {
  try {
    let i = 1;
    const newSet: string[] = [];

    sets.splice(setId, 1);
    lbs.splice(setId, 1);
    reps.splice(setId, 1);

    sets.map((set) => {
      if (!!Number(set)) {
        newSet.push(String(i));
        i++;
      } else {
        newSet.push(set);
      }
    });
    if (!sets.length) {
      newSet.push("1");
      lbs.push(0);
      reps.push(0);
    }

    const updated = await prisma.workout.update({
      where: { id },
      data: {
        sets: newSet,
        lbs,
        reps,
      },
    });

    if (!updated) {
      return null;
    }

    const session = await getSessionById(updated.workoutSessionId);
    if (!session) {
      return null;
    }
    return session;
  } catch (err: any) {
    console.log("Error deleting set: ", err);
  }
};
