"use client";

import { useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { type Workout } from "@/types";
import { CustomButton } from "@/components";
import { updateWorkout, changeWorkoutSet, deleteSet } from "@/actions";
import LoadingModel from "@/components/models/LoadingModel";
import { HiOutlineTrash } from "react-icons/hi";
import moment from "moment";

type EditWorkoutFormProps = {
  items: Workout[];
};

const EditWorkoutForm = ({ items }: EditWorkoutFormProps) => {
  const date = items.findLast((item) => item);
  const [dateInput, setDateInput] = useState(false);
  const [setOptions, setSetOptions] = useState(false);
  const [setIndex, setSetIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [workouts, setWorkouts] = useState<Workout[]>(items);
  const router = useRouter();

  const handleSubmit = async (data: FormData) => {
    const dataLbs = Object.values(data.getAll("lbs")?.valueOf());
    const dataReps = Object.values(data.getAll("reps")?.valueOf());
    const dataDate = data.get("date")?.valueOf();
    console.log(typeof dataDate);

    workouts.map(({ id, lbs, reps, createdAt, updatedAt }) => {
      lbs.map((lb, idx) => {
        lbs.splice(idx, 1, Number(dataLbs[0]));
        dataLbs.shift();
        reps.splice(idx, 1, Number(dataReps[0]));
        dataReps.shift();
      });
      Object.assign(createdAt, dataDate);
      console.log(createdAt);
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

  return (
    <div className="wrapper container">
      {isLoading && <LoadingModel />}
      <form className="workout-form" action={handleSubmit}>
        <div className="flex justify-center items-center my-4">
          {dateInput ? (
            <input
              name="date"
              type="datetime-local"
              className="rounded-md text-white"
            />
          ) : (
            <div onClick={() => setDateInput(!dateInput)}>
              <span>{moment(date?.createdAt).calendar()}</span>
            </div>
          )}
        </div>
        {items.map(({ id, exercise, sets, lbs, reps }) => (
          <div key={id}>
            <h1 className="workout-form__title">{exercise}</h1>
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
                handleClick={() => addSet(id)}
                containerStyles="workout-form__add-btn"
              />
            </div>
          </div>
        ))}
        <div className="workout-form__btn">
          <button type="submit" className="workout-form__submit-btn">
            Update Workout
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditWorkoutForm;
