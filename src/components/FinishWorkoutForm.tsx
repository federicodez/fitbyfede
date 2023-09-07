"use client";
import { useRouter } from "next/navigation";
import { CustomButton } from ".";
import { Workout } from "@/types";
import { deleteWorkout, updateWorkout } from "@/utils";

type FinishWorkoutFormProps = {
  workout: Workout;
};

export default function FinishWorkoutForm({ workout }: FinishWorkoutFormProps) {
  const { id, exercise, lbs, reps } = workout;
  const router = useRouter();

  const handleSubmit = async (data: FormData) => {
    const dataLbs = data.getAll("lbs")?.valueOf();
    const dataReps = data.getAll("reps")?.valueOf();

    if (!dataLbs || !dataReps) {
      alert("Exercise, lbs, sets, and reps are required");
      return;
    }

    const newLbs = Object.values(dataLbs);
    newLbs?.map((lb) => {
      if (!lb.length) throw new Error("Invalid weight.");
      lbs?.push(Number(lb));
      lbs?.shift();
    });

    const newReps = Object.values(dataReps);
    newReps?.map((rep) => {
      if (!rep.length) throw new Error("Invalid rep.");
      reps?.push(Number(rep));
      reps?.shift();
    });

    try {
      await updateWorkout(id, lbs, reps);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const addSet = async () => {
    lbs?.push(0);
    reps?.push(0);
    await updateWorkout(id, lbs, reps);
    router.refresh();
  };

  const removeWorkout = async () => {
    const confirmed = confirm("Are you sure?");
    const deleted = deleteWorkout(id);
    router.push("/");
  };

  return (
    <div className="wrapper container">
      <form action={handleSubmit} className="finish-workout-form">
        <h1 className="finish-workout-form__title">{exercise}</h1>
        <ul className="finish-workout-form__list">
          {lbs?.map((lb, id) => (
            <li key={id} className="finish-workout-form__item">
              <div className="finish-workout-form__set">
                <label>Set</label>
                <div className="finish-workout-form__set-id">{(id += 1)}</div>
              </div>
              <div>
                <label htmlFor="lbs">Weight (lbs): </label>
                <input
                  type="number"
                  name="lbs"
                  id="lbs"
                  className="finish-workout-form__input"
                  required
                />
              </div>
              <div>
                <label htmlFor="reps">Reps: </label>
                <input
                  type="number"
                  name="reps"
                  id="reps"
                  className="finish-workout-form__input"
                  required
                />
              </div>
            </li>
          ))}
        </ul>
        <div className="finish-workout-form__btn-container">
          <CustomButton
            title="Add Set"
            containerStyles="finish-workout-form__custom-btn"
            handleClick={addSet}
          />
          <button type="submit" className="finish-workout-form__btn">
            Create Workout
          </button>
          <CustomButton
            title="Cancel Workout"
            containerStyles="finish-workout-form__cancel-btn"
            handleClick={removeWorkout}
          />
        </div>
      </form>
    </div>
  );
}
