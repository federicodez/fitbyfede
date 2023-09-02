"use client";
import { useRouter } from "next/navigation";
import { WorkoutProps } from "@/types";
import { CustomButton } from ".";

export default function EditWorkoutForm({
  _id,
  id,
  exercise,
  lbs,
  reps,
  notes,
}: WorkoutProps) {
  // const [newExercise, setNewExercise] = useState(exercise);
  // const [newLbs, setNewLbs] = useState<number[]>([]);
  // const [newReps, setNewReps] = useState<number[]>([]);

  const router = useRouter();

  const handleSubmit = async (data: FormData) => {
    const lbs = data.getAll("lbs")?.valueOf();
    lbs?.map((lb) => {
      if (!lb.length) throw new Error("Invalid weight.");
    });
    const reps = data.getAll("reps")?.valueOf();
    reps?.map((rep) => {
      if (!rep.length) throw new Error("Invalid rep.");
    });
    try {
      const res = await fetch(`http://localhost:3000/api/workouts/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ lbs, reps }),
      });

      if (!res.ok) {
        throw new Error("Failed to edit workout");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const addSet = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/editWorkout/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ lbs, reps }),
      });

      if (!res.ok) {
        throw new Error("Failed to edit workout");
      }

      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="wrapper container">
      <form action={handleSubmit} className="edit-workout-form">
        <h1>{exercise}</h1>
        <div className="edit-card">
          <div className="edit-card-list">
            <ul>
              {lbs?.map((lb, id) => (
                <li key={id}>
                  <label>Set</label>
                  <div>{(id += 1)}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className="edit-card-list">
            <ul>
              {lbs?.map((lb, id) => (
                <li key={`${lb} ${id}`}>
                  <label htmlFor="lbs">Weight (lbs): </label>
                  <input
                    id="number"
                    type="number"
                    name="lbs"
                    defaultValue={0}
                    placeholder={`${lb}`}
                    className="bg-white border rounded-lg"
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="edit-card-list">
            <ul>
              {reps?.map((rep, id) => (
                <li key={`${rep} ${id}`}>
                  <label htmlFor="reps">Reps: </label>
                  <input
                    type="number"
                    name="reps"
                    defaultValue={0}
                    placeholder={`${rep}`}
                    className="bg-white border rounded-lg"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button
          type="submit"
          className="border rounded-lg bg-blue-900 w-48 m-4"
        >
          Update Workout
        </button>
        <CustomButton
          title="Add Set"
          handleClick={addSet}
          containerStyles="bg-blue-900"
        />
      </form>
    </div>
  );
}
