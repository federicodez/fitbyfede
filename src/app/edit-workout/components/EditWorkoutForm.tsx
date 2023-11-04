"use client";

import {
  useState,
  MouseEvent,
  TouchEvent,
  Suspense,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { Workout, WorkoutSession } from "@/types";
import { CustomButton, SetOptions } from "@/components";
import {
  updateWorkout,
  changeWorkoutSet,
  deleteSet,
  updateWorkoutWithDate,
  updateWorkoutSession,
  updateWorkouts,
  updateDate,
  deleteSession,
  deleteWorkout,
} from "@/actions";
import LoadingModel from "@/components/models/LoadingModel";
import { HiOutlineTrash, HiX } from "react-icons/hi";
import { SlOptions } from "react-icons/sl";
import moment from "moment";
import AddExercise from "./AddExercise";
import { AiFillEdit } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { TbReplace } from "react-icons/tb";
import { BiTimer } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";

type EditWorkoutFormProps = {
  previous: Workout[] | [];
  items: Workout[];
  session: WorkoutSession;
  recentWorkouts: Workout[];
};

const cursorPosition = (event: any) => {
  if (event?.touches?.[0]?.clientX) return event.touches[0].clientX;
  if (event?.clientX) return event?.clientX;
  if (event?.nativeEvent?.touches?.[0]?.clientX)
    return event.nativeEvent.touches[0].clientX;
  return event?.nativeEvent?.clientX;
};

const EditWorkoutForm = ({
  previous,
  items,
  session,
  recentWorkouts,
}: EditWorkoutFormProps) => {
  const date = session;
  const [notes, setNotes] = useState<string>("");
  const [sessionOptions, setSessionOptions] = useState(false);
  const [workoutName, setWorkoutName] = useState("");
  const [dateInput, setDateInput] = useState(false);
  const [swipeDelete, setSwipeDelete] = useState<number | null>(null);
  const [setOptions, setSetOptions] = useState<string | null>(null);
  const [setIndex, setSetIndex] = useState<number>(0);
  const [addExercise, setAddExercise] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | boolean>(false);
  const [replace, setReplace] = useState(false);
  const [workouts, setWorkouts] = useState<Workout[]>(items);
  const router = useRouter();

  const startTouchPosition = useRef(0);
  const initTranslate = useRef(0);
  const [translate, setTranslate] = useState(0);
  const target = useRef<string[]>([]);
  const targetId = useRef("");
  const targetIndex = useRef(0);

  useEffect(() => {
    if (session?.notes) {
      setNotes(session?.notes);
    }
  }, []);

  const hours = Math.floor(session?.time / 360000);
  const minutes = Math.floor((session?.time % 360000) / 6000);
  const seconds = Math.floor((session?.time % 6000) / 100);

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
        await updateWorkoutSession(
          session?.id,
          workoutName,
          notes,
          session?.time,
        );
      } else {
        await updateWorkoutSession(
          session?.id,
          session?.name,
          notes,
          session?.time,
        );
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
    const date = data.get("date")?.valueOf();

    workouts.map(({ lbs, reps }) => {
      lbs.map((_, idx) => {
        lbs.splice(idx, 1, Number(dataLbs[0]));
        dataLbs.shift();
        reps.splice(idx, 1, Number(dataReps[0]));
        dataReps.shift();
      });
    });
    setWorkouts(workouts);

    try {
      if (workoutName) {
        await updateWorkoutSession(
          session?.id,
          workoutName,
          notes,
          session?.time,
        );
      } else {
        await updateWorkoutSession(
          session?.id,
          session?.name,
          notes,
          session?.time,
        );
      }
      if (!date && date !== undefined) {
        await updateDate(workouts, session, date);
      } else {
        await updateWorkouts(workouts);
      }
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
    await deleteSession(session.id);
    router.push("/workouts");
  };

  const removeExercise = async (id: string) => {
    await deleteWorkout(id);
    router.refresh();
  };

  const onStart = async (id: string, setId: number) => {
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
      console.log("deleted");
      setSwipeDelete(null);
      router.refresh();
    } catch (err: any) {
      console.log(err);
    }
  };

  return !addExercise ? (
    <Suspense fallback={<LoadingModel />}>
      <div className="wrapper container">
        <form className="workout-form" action={handleSubmit}>
          <div className="flex flex-row justify-between mt-3">
            <button onClick={() => router.push("/workouts")}>
              <HiX className="bg-gray-300 rounded-md" />
            </button>
            <h1>Edit Workout</h1>
            <button type="submit" className="bg-blue-300 rounded-md px-2">
              Save
            </button>
          </div>
          <div className="flex my-4 flex-col">
            <div className="flex flex-row items-center gap-2">
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
                    className="flex flex-row items-center gap-2 m-1"
                  >
                    <AiFillEdit className="text-blue-500" />
                    <span>Edit</span>
                    <span>Workout</span>
                    <span>Name</span>
                  </div>
                  <div
                    className="flex flex-row items-center gap-2 m-1"
                    onClick={() => setDateInput(true)}
                  >
                    <AiFillEdit className="text-blue-500" />
                    <span>Edit</span>
                    <span>Workout</span>
                    <span>Date</span>
                  </div>
                </div>
                <SlOptions
                  onClick={() => setSessionOptions(true)}
                  className="bg-gray-300 rounded-md py-1"
                />
              </div>
            </div>
            {dateInput ? (
              <input
                name="date"
                type="datetime-local"
                className="rounded-md text-white"
                onMouseLeave={() => setDateInput(false)}
              />
            ) : (
              <div>
                <div className="flex flex-col gap-2">
                  <div>{moment(date?.createdAt).calendar()}</div>
                  <div>
                    {hours ? `${hours}:` : ""}
                    {minutes.toString().padStart(2)}:
                    {seconds.toString().padStart(2, "0")}m
                  </div>
                  <div>{session?.notes}</div>
                </div>
              </div>
            )}
          </div>
          {items.map(({ id, name, sets, lbs, reps, bodyPart }, index) => (
            <div key={id} className="touch-pan-left">
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

              <div className="flex justify-evenly">
                <span>Set</span>
                <label>Previous</label>
                {bodyPart === "cardio" ? (
                  <label htmlFor="lbs">mile</label>
                ) : (
                  <label htmlFor="lbs">lbs</label>
                )}
                {bodyPart === "cardio" ? (
                  <label id={id} htmlFor="reps">
                    Time
                  </label>
                ) : (
                  <label id={id} htmlFor="reps">
                    Reps
                  </label>
                )}
              </div>
              <ul className="flex flex-col gap-4">
                {sets?.map((set, setId) => (
                  <div key={setId}>
                    <Swiper
                      spaceBetween={50}
                      slidesPerView={1}
                      onSlideChange={() => onStart(id, setId)}
                    >
                      <SwiperSlide>
                        <li className="flex flex-row justify-evenly">
                          <div className="workout-form__label-input m-1">
                            <SetOptions
                              id={id}
                              setId={setId}
                              setIndex={setIndex}
                              setOptions={setOptions}
                              setSetOptions={setSetOptions}
                              changeSet={changeSet}
                            />
                            <CustomButton
                              title={set}
                              containerStyles="bg-gray-300 rounded-lg w-8 pl-[0.5]"
                              handleClick={() => {
                                setSetOptions(id);
                                setSetIndex(setId);
                              }}
                            />
                          </div>
                          {previous?.[index]?.lbs[setId] ? (
                            <div className="workout-form__label-input">
                              <div className="bg-gray-300 rounded-lg w-24 m-1 pl-2">{`${previous[index].lbs[setId]} x ${previous[index].reps[setId]}`}</div>
                            </div>
                          ) : (
                            <div className="border-4 rounded-lg w-14 h-fit my-1 mx-4 border-gray-300"></div>
                          )}
                          <div className="workout-form__label-input">
                            <input
                              type="string"
                              name="lbs"
                              defaultValue={`${lbs[setId] ? lbs[setId] : 0}`}
                              placeholder={`${lbs[setId]}`}
                              className="bg-gray-300 rounded-lg w-16 m-1 pl-2"
                            />
                          </div>
                          <div className="workout-form__label-input">
                            <input
                              type="string"
                              name="reps"
                              defaultValue={`${reps[setId] ? reps[setId] : 0}`}
                              placeholder={`${reps[setId]}`}
                              className="bg-gray-300 rounded-lg w-12 m-1 pl-2"
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
                  handleClick={() => addSet(id)}
                  containerStyles="workout-form__add-btn"
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
            <button
              onClick={() => removeWorkout()}
              className="rounded-lg bg-red-300 text-red-900"
            >
              Delete Workout
            </button>
          </div>
        </form>
      </div>
    </Suspense>
  ) : (
    <AddExercise
      sessionId={session.id}
      setAddExercise={setAddExercise}
      setWorkouts={setWorkouts}
      recentWorkouts={recentWorkouts}
    />
  );
};

export default EditWorkoutForm;
