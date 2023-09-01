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

export const getWorkoutById = async (id: string) => {
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
