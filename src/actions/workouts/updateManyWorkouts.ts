"use server";
import prisma from "@/db";
import { WorkoutSession } from "@/types";
import { getSessionById } from ".";

export const updateManyWorkouts = async (
  session: WorkoutSession,
  dataLbs: number[],
  dataReps: number[],
) => {
  try {
    session.Workout.map(async ({ id, sets, lbs, reps }) => {
      lbs.map((_, idx) => {
        lbs.splice(idx, 1, Number(dataLbs[0]));
        dataLbs.shift();
        reps.splice(idx, 1, Number(dataReps[0]));
        dataReps.shift();
      });

      await prisma.workout.update({
        where: {
          id,
        },
        data: {
          sets,
          lbs,
          reps,
        },
      });

      const updated = await getSessionById(session.id);

      if (!updated) {
        return null;
      }
      return updated;
    });
  } catch (error) {
    console.log("Error updating workouts ", error);
  }
};
