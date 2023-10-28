"use client";

import { useState, MouseEvent, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Workout, Data } from "@/types";
import { CustomButton, SetOptions } from "@/components";
import LoadingModel from "@/components/models/LoadingModel";
import AddExercise from "./AddExercise";
import {
  updateWorkout,
  deleteSession,
  deleteSet,
  changeWorkoutSet,
  deleteWorkout,
  updateWorkoutSession,
} from "@/actions";
import { SlOptions } from "react-icons/sl";
import { HiX } from "react-icons/hi";
import { AiFillEdit } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { TbReplace } from "react-icons/tb";
import { BiTimer } from "react-icons/bi";
import StartTimer from "@/components/Timer";
import { useTimerContext } from "@/context/TimerContext";

type FinishWorkoutFormProps = {
  sessionId: string;
  items: Workout[];
  recentWorkouts: Workout[];
};

const FinishWorkoutForm = ({
  sessionId,
  items,
  recentWorkouts,
}: FinishWorkoutFormProps) => {
  const [notes, setNotes] = useState<string>("");
  const [setOptions, setSetOptions] = useState<string | null>(null);
  const [setIndex, setSetIndex] = useState<number>(0);
  const [workouts, setWorkouts] = useState<Workout[]>(items);
  const [addExercise, setAddExercise] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | boolean>(false);
  const [replace, setReplace] = useState(false);
  const router = useRouter();
  const { time } = useTimerContext();

  const addAnotherExercise = async (data: FormData) => {
    const dataLbs = Object.values(data.getAll("lbs")?.valueOf());
    const dataReps = Object.values(data.getAll("reps")?.valueOf());

    workouts.map(({ lbs, reps }) => {
      lbs.map((_, id) => {
        lbs.splice(id, 1, Number(dataLbs[0]));
        dataLbs.shift();
        reps.splice(id, 1, Number(dataReps[0]));
        dataReps.shift();
      });
    });
    setWorkouts(workouts);

    try {
      await updateWorkoutSession(sessionId, notes, time);
      workouts.map(async ({ id, sets, lbs, reps }) => {
        await updateWorkout(id, sets, lbs, reps);
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (data: FormData) => {
    const dataLbs = Object.values(data.getAll("lbs")?.valueOf());
    const dataReps = Object.values(data.getAll("reps")?.valueOf());

    workouts.map(({ lbs, reps }) => {
      lbs.map((_, id) => {
        lbs.splice(id, 1, Number(dataLbs[0]));
        dataLbs.shift();
        reps.splice(id, 1, Number(dataReps[0]));
        dataReps.shift();
      });
    });
    setWorkouts(workouts);

    try {
      await updateWorkoutSession(sessionId, notes, time);
      workouts.map(async ({ id, sets, lbs, reps }) => {
        await updateWorkout(id, sets, lbs, reps);
      });
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
    router.push("/workouts");
  };

  const removeExercise = async (id: string) => {
    await deleteWorkout(id);
    router.refresh();
  };

  return !addExercise ? (
    <Suspense fallback={<LoadingModel />}>
      <div className="wrapper container">
        <StartTimer />
        <form action={handleSubmit}>
          {items.map(({ id, name, sets, lbs, reps }) => (
            <div key={id}>
              <div className="flex flex-row  my-4">
                <h1 className="flex-1 text-2xl font-bold">{name}</h1>
                <div className="flex-initial w-fit">
                  <div className="relative">
                    <div
                      onMouseLeave={() => setOpenMenu(false)}
                      className={
                        openMenu === id
                          ? "absolute w-56 z-10 bg-gray-800 text-white rounded-lg right-0 p-2 cursor-pointer"
                          : "hidden"
                      }
                    >
                      <div
                        onClick={() => {
                          setNotes(" ");
                          setOpenMenu(false);
                        }}
                        className="flex flex-row items-center gap-2"
                      >
                        <AiFillEdit className="text-blue-500" />
                        <span>Add</span>
                        <span>a</span>
                        <span>Note</span>
                      </div>
                      <div className="flex flex-row items-center flex-nowrap gap-2 my-5">
                        <MdAdd className="text-blue-500" />
                        <span>Add</span>
                        <span>Warm-up</span>
                        <span>Sets</span>
                      </div>
                      <div
                        className="flex flex-row items-center gap-2 my-5"
                        onClick={() => {
                          setReplace(!replace);
                          setOpenMenu(false);
                        }}
                      >
                        <TbReplace className="text-blue-499" />
                        <span>Replace</span>
                        <span>Exercise</span>
                      </div>
                      <div className="flex flex-row items-center gap-2 my-5">
                        <BiTimer className="text-blue-500" />
                        <span>Auto</span>
                        <span>Rest</span>
                        <span>Timer</span>
                      </div>
                      <div
                        className={
                          openMenu
                            ? "flex flex-row items-center gap-2"
                            : "hidden"
                        }
                        onClick={() => {
                          removeExercise(id);
                          setOpenMenu(false);
                        }}
                      >
                        <HiX className="text-red-500" />
                        <span>Remove</span>
                        <span>Exercise</span>
                      </div>
                    </div>
                  </div>
                  <div onClick={() => setOpenMenu(id)}>
                    <SlOptions className="flex w-fit bg-gray-400 rounded-md px-2 right-0" />
                  </div>
                </div>
              </div>
              <div className={!notes.length ? "hidden" : ""}>
                <input
                  type="text"
                  className="bg-white rounded-md w-full"
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-3">
                <div
                  className={
                    replace
                      ? "absolute top-10 z-10 bg-white rounded-lg grid grid-cols-2 p-4"
                      : "hidden"
                  }
                >
                  <h3 className="col-span-2 text-center">Replace Exercise?</h3>
                  <span className="col-span-2">
                    All previously entered sets will be replaced.
                  </span>
                  <button
                    className="m-1 px-4 bg-gray-300 rounded-md"
                    onClick={() => {
                      setOpenMenu(false);
                      setReplace(!replace);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="m-1 px-4 bg-red-500 rounded-md"
                    onClick={() => {
                      removeExercise(id);
                      setReplace(!replace);
                      setAddExercise(true);
                    }}
                  >
                    Replace
                  </button>
                </div>
              </div>
              <div className="workout-form__container">
                <ul className="workout-form__list" id="sets-list">
                  {sets?.map((set, setId) => (
                    <li key={setId} className="workout-form__item">
                      <button
                        type="button"
                        onClick={() => handleDeleteSet(id, setId)}
                      >
                        <HiX className="text-red-500" />
                      </button>
                      <div className="workout-form__label-input">
                        <SetOptions
                          id={id}
                          setId={setId}
                          setIndex={setIndex}
                          setOptions={setOptions}
                          setSetOptions={setSetOptions}
                          changeSet={changeSet}
                        />
                        <span>Set</span>
                        <CustomButton
                          title={set}
                          containerStyles="workout-form__input"
                          handleClick={() => {
                            setSetOptions(id);
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
            <button
              type="submit"
              className="rounded-lg bg-purple-100 text-purple-900"
              formAction={(data) => {
                setAddExercise(true);
                addAnotherExercise(data);
              }}
            >
              Add Exercise
            </button>
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
    </Suspense>
  ) : (
    <AddExercise
      sessionId={sessionId}
      setAddExercise={setAddExercise}
      setWorkouts={setWorkouts}
      recentWorkouts={recentWorkouts}
    />
  );
};

export default FinishWorkoutForm;
