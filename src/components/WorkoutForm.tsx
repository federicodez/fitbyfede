"use client";

import { useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { type Workout } from "@/types";
import { CustomButton, Button } from "@/components";
import { updateWorkout, changeWorkoutSet, deleteSet } from "@/actions";
import LoadingModel from "@/components/models/LoadingModel";
import { HiOutlineTrash } from "react-icons/hi";

type WorkoutFormProps = {
  formtype: string;
  workout: Workout;
};

const WorkoutForm = ({ formtype, workout }: WorkoutFormProps) => {
  const [setOptions, setSetOptions] = useState(false);
  const [setIndex, setSetIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const { id, exercise, sets, lbs, reps } = workout;
  const router = useRouter();

  const handleSubmit = async (data: FormData) => {
    const dataLbs = data.getAll("lbs")?.valueOf();
    Object.values(dataLbs).map((lb) => {
      lbs?.push(Number(lb));
      lbs?.shift();
    });
    const dataReps = data.getAll("reps")?.valueOf();
    Object.values(dataReps).map((rep) => {
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

  const changeSet = async (e: MouseEvent) => {
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

  const handleDeleteSet = async (setId: number) => {
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

  return (
    <>
      {isLoading && <LoadingModel />}
      <div className="wrapper container">
        <form className="workout-form" action={handleSubmit}>
          <h1 className="workout-form__title">{exercise}</h1>
          <div className="workout-form__container">
            <ul className="workout-form__list" id="sets-list">
              <ul
                onMouseLeave={() => setSetOptions(!setOptions)}
                className={
                  setOptions
                    ? "absolute bg-gray-800 text-white ml-20 px-2 rounded-lg"
                    : "hidden"
                }
              >
                <li>
                  <option
                    value="w"
                    onClick={(e) => {
                      changeSet(e);
                      setSetOptions(!setOptions);
                    }}
                  >
                    Warm-up
                  </option>
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
              {sets?.map((set, setId) => (
                <li key={setId} className="workout-form__item">
                  <button type="button" onClick={() => handleDeleteSet(setId)}>
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
            <Button disabled={isLoading} fullWidth type="submit">
              {formtype}
            </Button>
            <CustomButton
              title="Cancel"
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

export default WorkoutForm;
