"use client";

import { useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { Workout } from "@prisma/client";
import { Button, CustomButton, WorkoutForm } from "@/components";
import LoadingModel from "@/components/models/LoadingModel";
import {
  updateWorkout,
  deleteSession,
  deleteSet,
  changeWorkoutSet,
} from "@/actions";
import { HiOutlineTrash } from "react-icons/hi2";

type FinishWorkoutFormProps = {
  sessionId: string;
  items: Workout[];
};

const FinishWorkoutForm = ({ sessionId, items }: FinishWorkoutFormProps) => {
  const [setOptions, setSetOptions] = useState(false);
  const [setIndex, setSetIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [workouts, setWorkouts] = useState<Workout[]>(items);
  const router = useRouter();

  const handleSubmit = async (data: FormData) => {
    const dataLbs = Object.values(data.getAll("lbs")?.valueOf());
    const dataReps = Object.values(data.getAll("reps")?.valueOf());

    workouts.map(({ id, lbs, reps }) => {
      lbs.map((lb, idx) => {
        lbs.splice(idx, 1, Number(dataLbs[0]));
        dataLbs.shift();
        reps.splice(idx, 1, Number(dataReps[0]));
        dataReps.shift();
      });
    });
    setWorkouts(workouts);

    try {
      workouts.map(async ({ id, sets, lbs, reps }) => {
        await updateWorkout(id, sets, lbs, reps);
      });
      setIsLoading(true);
      router.push("/workouts");
    } catch (error) {
      console.log(error);
    }
  };

  const addSet = async (id: string) => {
    const workout = workouts.filter((workout) => workout.id === id);
    const { sets, lbs, reps } = workout[0];
    try {
      const lastSet = sets[sets.length - 1];
      if (!!Number(lastSet)) {
        const set = Number(lastSet) + 1;
        sets?.push(String(set));
      } else {
        sets?.push("1");
      }

      lbs?.push(0);
      reps?.push(0);
      await updateWorkout(id, sets, lbs, reps);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const changeSet = async (id: string, e: MouseEvent) => {
    const workout = workouts.filter((workout) => workout.id === id);
    const { sets } = workout[0];
    const { target } = e;
    if (target) {
      const set = (target as HTMLButtonElement).value;
      sets.splice(setIndex, 1, set);
      const newSet: string[] = [];
      let i = 1;
      sets.map((set) => {
        if (!!Number(set)) {
          newSet.push(String(i));
          i++;
        } else {
          newSet.push(set);
        }
      });

      await changeWorkoutSet(id, newSet);
      router.refresh();
    }
  };

  const handleDeleteSet = async (id: string, setId: number) => {
    const workout = workouts.filter((workout) => workout.id === id);
    const { sets, lbs, reps } = workout[0];
    sets.splice(setId, 1);
    lbs.splice(setId, 1);
    reps.splice(setId, 1);
    if (!sets.length) {
      sets.push("1");
      lbs.push(0);
      reps.push(0);
    }
    try {
      await deleteSet(id, sets, lbs, reps);
      router.refresh();
    } catch (err: any) {
      console.log(err);
    }
  };

  const removeWorkout = async () => {
    await deleteSession(sessionId);
    setIsLoading(true);
    router.push("/workouts");
  };

  return (
    <div className="wrapper container">
      {isLoading && <LoadingModel />}
      <form action={handleSubmit}>
        {items.map(({ id, name, sets, lbs, reps }) => (
          <div key={id}>
            <h1 className="workout-form__title">{name}</h1>
            <div className="workout-form__container">
              <ul className="workout-form__list" id="sets-list">
                <div
                  onMouseLeave={() => setSetOptions(!setOptions)}
                  className={
                    setOptions
                      ? "absolute bg-gray-800 text-white ml-20 px-2 rounded-lg"
                      : "hidden"
                  }
                >
                  <option
                    value="w"
                    onClick={(e) => {
                      changeSet(id, e);
                      setSetOptions(!setOptions);
                    }}
                  >
                    Warm-up
                  </option>
                  <option
                    value="d"
                    onClick={(e) => {
                      changeSet(id, e);
                      setSetOptions(!setOptions);
                    }}
                  >
                    Drop Set
                  </option>
                  <option
                    value="f"
                    onClick={(e) => {
                      changeSet(id, e);
                      setSetOptions(!setOptions);
                    }}
                  >
                    Failure
                  </option>
                </div>
                {sets?.map((set, setId) => (
                  <li key={setId} className="workout-form__item">
                    <button
                      type="button"
                      onClick={() => handleDeleteSet(id, setId)}
                    >
                      <HiOutlineTrash />
                    </button>
                    <div className="workout-form__label-input">
                      <span>Set</span>
                      <CustomButton
                        title={set}
                        containerStyles="workout-form__input"
                        handleClick={() => {
                          setSetOptions(!setOptions);
                          setSetIndex(setId);
                        }}
                      />
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
                        defaultValue={`${lb ? lb : 0}`}
                        placeholder={`${lb}`}
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
                        defaultValue={`${rep ? rep : 0}`}
                        placeholder={`${rep}`}
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
                handleClick={() => addSet(id)}
              />
            </div>
          </div>
        ))}
        <div className="workout-form__btn">
          <button className="workout-form__submit-btn" type="submit">
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
  );
};

export default FinishWorkoutForm;
