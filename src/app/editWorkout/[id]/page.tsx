import EditWorkoutForm from "@/components/EditWorkoutForm";

type EditWorkoutProps = {
  id: string;
};

const getWorkoutById = async (id: EditWorkoutProps) => {
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

export default async function EditWorkout({ params }) {
  const { id } = params;
  const { workout } = await getWorkoutById(id);
  const { exercise, lbs, reps } = workout;
  return (
    <div>
      <EditWorkoutForm id={id} exercise={exercise} lbs={lbs} reps={reps} />
    </div>
  );
}
