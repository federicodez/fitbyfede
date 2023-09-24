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
    const dataSets = data.getAll("sets")?.valueOf();
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
      await updateWorkout(id, sets, lbs, reps);
      setIsLoading(true);
      router.push("/workouts");
    } catch (error) {
      console.log(error);
    }
  };

  const addSet = async () => {
    try {
      const set = Number(sets[sets.length - 1]) + 1;
      sets?.push(String(set));
      lbs?.push(0);
      reps?.push(0);
      await updateWorkout(id, sets, lbs, reps);
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  };

  const removeWorkout = async () => {
    await deleteWorkout(id);
    router.push("/workouts");
  };

  return (
    <>
      {isLoading && <LoadingModel />}
      <div className="wrapper container">
        <form action={handleSubmit} className="workout-form">
          <h1 className="workout-form__title">{exercise}</h1>
          <div className="workout-form__container">
            <ul className="workout-form__list" id="sets-list">
              {sets?.map((set, id) => (
                <li key={id} className="workout-form__item">
                  <div className="workout-form__label-input">
                    <label htmlFor="set">Set</label>
                    <span className="workout-form__input">{set}</span>
                  </div>
                </li>
              ))}
            </ul>
            <ul className="workout-form__list">
              {lbs?.map((lb, id) => (
                <li key={id} className="workout-form__item">
                  <div className="workout-form__label-input">
                    <label htmlFor="lbs">Weight (lbs): </label>
                    <input
                      type="number"
                      name="lbs"
                      id="lbs"
                      className="workout-form__input"
                      required
                    />
                  </div>
                </li>
              ))}
            </ul>

            <ul className="workout-form__list">
              {reps?.map((rep, id) => (
                <li key={id} className="workout-form__item">
                  <div className="workout-form__label-input">
                    <label htmlFor="reps">Reps: </label>
                    <input
                      type="number"
                      name="reps"
                      id="reps"
                      className="workout-form__input"
                      required
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="workout-form__btn">
            <CustomButton
              title="Add Set"
              containerStyles="workout-form__add-btn"
              handleClick={addSet}
            />
            <button type="submit" className="workout-form__submit-btn">
              Create Workout
            </button>
            <CustomButton
              title="Cancel Workout"
              containerStyles="workout-form__cancel-btn"
              handleClick={removeWorkout}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default FinishWorkoutForm;
