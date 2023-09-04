export const getWorkouts = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/workouts", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch workouts");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading workouts: ", error);
  }
};

export const getWorkoutById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/workouts/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch workout");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getMostRecentWorkout = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/finishWorkout", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch most recent workout.");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const createWorkout = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/workouts", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ exercise, lbs, reps }),
    });

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
