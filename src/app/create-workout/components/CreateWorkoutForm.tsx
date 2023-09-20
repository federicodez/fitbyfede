"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createWorkout } from "@/actions";
import { CustomButton } from "@/components";

const CreateWorkoutForm = () => {
  const [exercise, setExercise] = useState("");
  const [lbs, setLbs] = useState([0]);
  const [reps, setReps] = useState([0]);

  const router = useRouter();

  const handleSubmit = async (data: FormData) => {
    const dataLbs = data.getAll("lbs")?.valueOf();
    const dataReps = data.getAll("reps")?.valueOf();

    if (!dataLbs || !dataReps) {
      alert("Exercise, lbs, sets, and reps are required");
      return;
    }

    const newLbs = Object.values(dataLbs).map((lb) => {
      lbs.push(Number(lb));
      lbs.shift();
    });
    const newReps = Object.values(dataReps).map((rep) => {
      reps.push(Number(rep));
      reps.shift();
    });

    setLbs([...lbs]);
    setReps([...reps]);

    try {
      await createWorkout(exercise, lbs, reps);
      router.push("/workouts");
    } catch (error) {
      console.log(error);
    }
  };

  const addSet = async () => {
    setLbs([...lbs, 0]);
    setReps([...reps, 0]);
    router.refresh();
  };

  const removeWorkout = async () => {
    router.push("/workouts");
  };

  return (
    <div className="wrapper container">
      <form action={handleSubmit} className="create-form flex flex-col">
        <label htmlFor="exercise">Exercise: </label>
        <input
          onChange={(e) => setExercise(e.target.value)}
          type="text"
          name="exercise"
          id="exercise"
          className="bg-white border rounded-lg"
        />
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
                  placeholder="0"
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
                  placeholder="0"
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

export default CreateWorkoutForm;
