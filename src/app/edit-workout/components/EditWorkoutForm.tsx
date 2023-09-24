"use client";

import { useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { type Workout } from "@/types";
import { CustomButton } from "@/components";
import { updateWorkout, changeWorkoutSet } from "@/actions";
import LoadingModel from "@/components/models/LoadingModel";

type EditWorkoutFormProps = {
  workout: Workout;
};

const EditWorkoutForm = ({ workout }: EditWorkoutFormProps) => {
  const [setOptions, setSetOptions] = useState(false);
  const [setIndex, setSetIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const { id, exercise, sets, lbs, reps } = workout;
  const router = useRouter();

  const handleSubmit = async (data: FormData) => {
    // const { target } = e;
    // if (target) {
    //   console.log("e: ", target as HTMLFormElement).value;
    // }
    const dataLbs = data.getAll("lbs")?.valueOf();
    const newLbs = Object.values(dataLbs).map((lb) => {
      lbs?.push(Number(lb));
      lbs?.shift();
    });
    const dataReps = data.getAll("reps")?.valueOf();
    const newReps = Object.values(dataReps).map((rep) => {
      reps?.push(Number(rep));
      reps?.shift();
    });

    try {
      await updateWorkout(id, sets, lbs, reps);
      setIsLoading(true);
      router.push(`/workouts`);
    } catch (error) {
      console.log(error);
    }
  };

  const addSet = async () => {
    try {
      enum Sets {
        warm = "w",
        drop = "d",
        failure = "f",
      }
      const lastSet = sets[sets.length - 1];
      if (
        (lastSet as Sets) !== "w" ||
        (lastSet as Sets) !== "d" ||
        (lastSet as Sets) !== "f"
      ) {
        const set = Number(lastSet) + 1;
        sets?.push(String(set));
        lbs?.push(0);
        reps?.push(0);
        await updateWorkout(id, sets, lbs, reps);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeSet = async (e: MouseEvent) => {
    const { target } = e;
    if (target) {
      const set = (target as HTMLButtonElement).value;
      sets[setIndex] = set;
      sets.forEach((set, id) => {
        if (id !== setIndex) {
          Number(set) - 1;
          String(set);
        }
      });
      console.log("set: ", sets);
      await changeWorkoutSet(id, sets);
    }
  };

  return (
    <>
      {isLoading && <LoadingModel />}
      <div className="wrapper container">
        <form className="workout-form" action={handleSubmit}>
          <h1 className="workout-form__title">{exercise}</h1>
          <div className="workout-form__container">
            <ul className="workout-form__list" id="sets-list">
              <ul
                className={
                  setOptions
                    ? "absolute bg-gray-500 text-white ml-20 px-2 rounded-lg"
                    : "hidden"
                }
              >
                <li>
                  <button
                    value="w"
                    onClick={(e) => {
                      changeSet(e);
                      setSetOptions(!setOptions);
                    }}
                  >
                    Warm-up
                  </button>
                </li>
                <li>
                  <option
                    value="d"
                    onClick={(e) => {
                      changeSet(e);
                      setSetOptions(!setOptions);
                    }}
                  >
                    Drop Set
                  </option>
                </li>
                <li>
                  <option
                    value="f"
                    onClick={(e) => {
                      changeSet(e);
                      setSetOptions(!setOptions);
                    }}
                  >
                    Failure
                  </option>
                </li>
              </ul>
              {sets?.map((set, id) => (
                <li key={id} className="workout-form__item">
                  <div className="workout-form__label-input">
                    <span>Set</span>
                    <CustomButton
                      title={set}
                      containerStyles="workout-form__input"
                      handleClick={() => {
                        setSetOptions(!setOptions);
                        setSetIndex(id);
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>

            <ul className="workout-form__list" id="lbs-list">
              {lbs?.map((lb, id) => (
                <li key={id} className="workout-form__item">
                  <div className="workout-form__label-input">
                    <label htmlFor="lbs">Weight (lbs): </label>
                    <input
                      type="string"
                      name="lbs"
                      defaultValue={`${lb ? lb : 0}`}
                      placeholder={`${lb}`}
                      className="workout-form__input"
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
                      type="string"
                      name="reps"
                      defaultValue={`${rep ? rep : 0}`}
                      placeholder={`${rep}`}
                      className="workout-form__input"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="workout-form__btn">
            <CustomButton
              title="Add Set"
              handleClick={addSet}
              containerStyles="workout-form__add-btn"
            />
            <button type="submit" className="workout-form__submit-btn">
              Update Workout
            </button>
            <CustomButton
              title="Cancel Update"
              handleClick={() => {
                router.push("/workouts");
              }}
              containerStyles="workout-form__cancel-btn"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default EditWorkoutForm;
