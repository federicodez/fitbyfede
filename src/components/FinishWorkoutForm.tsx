"use client";
import { useRouter } from "next/navigation";
import { CustomButton } from ".";
import { CurrentUser, Workout } from "@/types";
import { createWorkout, deleteWorkout, updateWorkout } from "@/actions";
import { useState } from "react";

type FinishWorkoutFormProps = {
  currentUser: CurrentUser;
  exercise: string;
};

const FinishWorkoutForm = ({
  currentUser,
  exercise,
}: FinishWorkoutFormProps) => {
  // const { id, exercise, lbs, reps } = workout;
  const [workout, setWorkout] = useState<Workout>({
    exercise,
    lbs: [0],
    reps: [0],
    userId: currentUser.id,
  });
  const router = useRouter();

  const handleSubmit = async (data: FormData) => {
    const dataLbs = data.getAll("lbs")?.valueOf();
    const dataReps = data.getAll("reps")?.valueOf();

    if (!dataLbs || !dataReps) {
      alert("Exercise, lbs, sets, and reps are required");
      return;
    }

    const newLbs = Object.values(dataLbs);
    newLbs?.map((lb) => Number(lb));
    console.log(newLbs);
    setWorkout({ ...workout, lbs: newLbs });

    const newReps = Object.values(dataReps);
    newReps?.map((rep) => Number(rep));
    console.log(newReps);
    setWorkout({ ...workout, reps: newReps });

    try {
      // await updateWorkout(workout);
      console.log({ workout });
      // await createWorkout(workout);
      router.push("/workouts");
    } catch (error) {
      console.log(error);
    }
  };

  const addSet = async () => {
    setWorkout({
      ...workout,
      lbs: [...workout.lbs, 0],
      reps: [...workout.reps, 0],
    });
  };

  const removeWorkout = async () => {
    // await deleteWorkout(id);
    router.push("/workouts");
  };

  return (
    <div className="wrapper container">
      <form action={handleSubmit} className="finish-workout-form">
        <h1 className="finish-workout-form__title">{exercise}</h1>
        <ul className="finish-workout-form__list">
          {workout.lbs?.map((lbs, id) => (
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
};

export default FinishWorkoutForm;
