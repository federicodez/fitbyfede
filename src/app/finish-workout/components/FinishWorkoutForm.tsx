"use client";

import { useState, MouseEvent, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Workout, Data, WorkoutSession } from "@/types";
import { CustomButton, SetOptions } from "@/components";
import LoadingModel from "@/components/models/LoadingModel";
import AddExercise from "./AddExercise";
import {
  updateWorkout,
  updateWorkouts,
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
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";

type FinishWorkoutFormProps = {
  previous: Workout[] | [];
  session: WorkoutSession;
  sessionId: string;
  items: Workout[];
  recentWorkouts: Workout[];
};

const FinishWorkoutForm = ({
  previous,
  session,
  sessionId,
  items,
  recentWorkouts,
}: FinishWorkoutFormProps) => {
  const [notes, setNotes] = useState<string>("");
  const [sessionOptions, setSessionOptions] = useState(false);
  const [workoutName, setWorkoutName] = useState("");
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
      if (workoutName) {
        await updateWorkoutSession(sessionId, workoutName, notes, time);
      } else {
        await updateWorkoutSession(sessionId, session.name, notes, time);
      }
      await updateWorkouts(workouts);
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
      if (workoutName) {
        await updateWorkoutSession(sessionId, workoutName, notes, time);
      } else {
        await updateWorkoutSession(sessionId, session.name, notes, time);
      }
      await updateWorkouts(workouts);
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
        <form action={handleSubmit}>
          <div className="flex flex-row justify-between mt-3">
            <button onClick={() => router.push("/workouts")}>
              <HiX className="bg-gray-300 rounded-md" />
            </button>
            <button type="submit" className="bg-blue-300 rounded-md px-2">
              Finish
            </button>
          </div>
          <div className="flex my-4 flex-col">
            <div className="flex flex-row items-center gap-2">
              {workoutName ? (
                <div className={!workoutName.length ? "hidden" : ""}>
                  <input
                    type="text"
                    className="bg-white rounded-md w-full"
                    onChange={(e) => setWorkoutName(e.target.value)}
                  />
                </div>
              ) : (
                <strong>{session?.name}</strong>
              )}
              <div
                onMouseLeave={() => setSessionOptions(false)}
                className={
                  sessionOptions
                    ? "absolute w-56 z-10 bg-gray-800 text-white rounded-lg p-2 cursor-pointer"
                    : "hidden"
                }
              >
                <div
                  onClick={() => {
                    setWorkoutName(" ");
                    setSessionOptions(false);
                  }}
                  className="flex flex-row items-center gap-2"
                >
                  <AiFillEdit />
                  <span>Edit</span>
                  <span>Workout</span>
                  <span>Name</span>
                </div>
              </div>
              <SlOptions
                onClick={() => setSessionOptions(true)}
                className="bg-gray-300 rounded-md py-1"
              />
            </div>
            <div>
              <div className="flex flex-col gap-2">
                <div className="relative left-0">
                  <StartTimer />
                </div>
                <div>{session?.notes || "Notes"}</div>
              </div>
            </div>
          </div>
          {items.map(({ id, name, sets, lbs, reps, bodyPart }, index) => (
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
              <div className="flex justify-evenly">
                <span className="flex justify-center items-center w-full">
                  Set
                </span>
                <span className="flex justify-center items-center w-full">
                  Previous
                </span>
                {bodyPart === "cardio" ? (
                  <span className="flex justify-center items-center w-full">
                    mile
                  </span>
                ) : (
                  <span className="flex justify-center items-center w-full">
                    lbs
                  </span>
                )}
                {bodyPart === "cardio" ? (
                  <span className="flex justify-center items-center w-full">
                    Time
                  </span>
                ) : (
                  <span className="flex justify-center items-center w-full">
                    Reps
                  </span>
                )}
              </div>
              <ul className="flex flex-col gap-4">
                {sets?.map((set, setId) => (
                  <div key={setId}>
                    <SetOptions
                      id={id}
                      setId={setId}
                      setIndex={setIndex}
                      setOptions={setOptions}
                      setSetOptions={setSetOptions}
                      changeSet={changeSet}
                    />
                    <Swiper
                      spaceBetween={50}
                      slidesPerView={1}
                      onSlideChange={() => handleDeleteSet(id, setId)}
                    >
                      <SwiperSlide>
                        <li className="flex flex-row justify-evenly">
                          <div className="relative h-full">
                            <CustomButton
                              title={set}
                              containerStyles="bg-gray-300 rounded-lg w-20 pl-[0.5]"
                              handleClick={() => {
                                setSetOptions(id);
                                setSetIndex(setId);
                              }}
                            />
                          </div>
                          {previous?.[index]?.lbs[setId] ? (
                            <div className="bg-gray-300 rounded-lg w-fit px-2">{`${previous[index].lbs[setId]} x ${previous[index].reps[setId]}`}</div>
                          ) : (
                            <div className="border-4 rounded-lg w-20 h-fit my-2 border-gray-300"></div>
                          )}
                          <div className="">
                            <input
                              type="number"
                              name="lbs"
                              id="lbs"
                              defaultValue={`${lbs[setId] ? lbs[setId] : ""}`}
                              placeholder={`${
                                previous[index].lbs[setId]
                                  ? previous[index].lbs[setId]
                                  : ""
                              }`}
                              className="bg-gray-300 rounded-lg w-20"
                              required
                            />
                          </div>
                          <div className="">
                            <input
                              type="number"
                              name="reps"
                              id="reps"
                              defaultValue={`${reps[setId] ? reps[setId] : ""}`}
                              placeholder={`${
                                previous[index].reps[setId]
                                  ? previous[index].reps[setId]
                                  : ""
                              }`}
                              className="bg-gray-300 rounded-lg w-20"
                              required
                            />
                          </div>
                        </li>
                      </SwiperSlide>
                      <SwiperSlide>
                        <button className={`w-full bg-red-300 rounded-lg px-2`}>
                          Delete
                        </button>
                      </SwiperSlide>
                    </Swiper>
                  </div>
                ))}
              </ul>

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
              className="rounded-lg bg-blue-300 text-blue-900"
              formAction={(data) => {
                setAddExercise(true);
                addAnotherExercise(data);
              }}
            >
              Add Exercise
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
