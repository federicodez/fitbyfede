import { prisma } from "@/db";

export const getWorkouts = async () => {
  try {
    const workouts = await prisma.workout.findMany();

    if (!workouts.length) {
      throw new Error("Failed to fetch workouts");
    }

    return workouts;
  } catch (error) {
    console.log("Error loading workouts: ", error);
  }
};

export const getWorkoutById = async (id) => {
  try {
    const workout = await prisma.workout.findUnique({
      where: {
        id,
      },
    });

    if (!workout.length) {
      throw new Error("Failed to fetch workout");
    }

    return workout;
  } catch (error) {
    console.log(error);
  }
};

export const getMostRecentWorkout = async () => {
  try {
  } catch (error) {
    console.log(error);
  }
};

export const createWorkout = async () => {
  try {
    await prisma.workout.create({ data: { exercise, lbs, reps } });
    if (res.ok) {
      router.refresh();
      router.push("/");
    } else {
      throw new Error("Failed to create a topic");
    }
  } catch (error) {
    console.log(error);
  }
};
