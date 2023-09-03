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
        body: JSON.stringify({ lbs: 0, reps: 0 }),
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
        <h1 className="edit-workout-form__title">{exercise}</h1>
        <div className="edit-workout-form__container">
          <ul className="edit-workout-form__list" id="lbs-list">
            {lbs?.map((lb, id) => (
              <li key={id} className="edit-workout-form__item">
                <div className="edit-workout-form__set">
                  <label>Set</label>
                  <div className="edit-workout-form__set-id">{(id += 1)}</div>
                </div>
                <div className="edit-workout-form__lbs">
                  <label htmlFor="lbs">Weight (lbs): </label>
                  <input
                    id="number"
                    type="number"
                    name="lbs"
                    defaultValue={0}
                    placeholder={`${lb}`}
                    className="edit-workout-form__input"
                  />
                </div>
              </li>
            ))}
          </ul>
          <ul className="edit-workout-form__list">
            {reps?.map((rep, id) => (
              <li key={id}>
                <label htmlFor="reps">Reps: </label>
                <input
                  type="number"
                  name="reps"
                  defaultValue={0}
                  placeholder={`${rep}`}
                  className="edit-workout-form__input"
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="edit-workout-form__btn">
          <CustomButton
            title="Add Set"
            handleClick={addSet}
            containerStyles="edit-workout-form__add-btn"
          />
          <button type="submit" className="edit-workout-form__submit-btn">
            Update Workout
          </button>
          <CustomButton
            title="Cancel Update"
            handleClick={() => {
              router.push("/");
            }}
            containerStyles="edit-workout-form__cancel-btn"
          />
        </div>
      </form>
    </div>
  );
}
