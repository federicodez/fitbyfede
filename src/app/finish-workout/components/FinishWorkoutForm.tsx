"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CustomButton } from "@/components";
import { type Workout } from "@/types";
import { deleteWorkout, updateWorkout } from "@/actions";
import LoadingModel from "@/components/models/LoadingModel";

type FinishWorkoutFormProps = {
  workout: Workout;
};

const FinishWorkoutForm = ({ workout }: FinishWorkoutFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { id, exercise, sets, lbs, reps } = workout;
  const router = useRouter();

  const handleSubmit = async (data: FormData) => {
    const dataLbs = data.getAll("lbs")?.valueOf();
    const dataReps = data.getAll("reps")?.valueOf();

    if (!dataLbs || !dataReps) {
      alert("Exercise, lbs, sets, and reps are required");
      return;
    }

    const newLbs = Object.values(dataLbs).map((lb) => {
      lbs?.push(Number(lb));
      lbs?.shift();
    });
    const newReps = Object.values(dataReps).map((rep) => {
      reps?.push(Number(rep));
      reps?.shift();
    });

    try {
      await updateWorkout(id, lbs, reps);
      setIsLoading(true);
      router.push("/workouts");
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
    await deleteWorkout(id);
    router.push("/workouts");
  };

  return (
    <>
      {isLoading && <LoadingModel />}
      <div className="wrapper container">
        <form action={handleSubmit} className="finish-workout-form">
          <h1 className="finish-workout-form__title">{exercise}</h1>
          <ul className="finish-workout-form__list">
            {lbs?.map((lbs, id) => (
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
    </>
  );
};

export default FinishWorkoutForm;
