"use client";

import { useState, MouseEvent, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Workout, WorkoutSession } from "@/types";
import { CustomButton, SetOptions, ReplaceBtn } from "@/components";
import LoadingModel from "@/components/models/LoadingModel";
import AddExercise from "./AddExercise";
import MenuOptions from "./MenuOptions";
import WorkoutSlider from "./WorkoutSlider";
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
import StartTimer from "@/components/Timer";
import { useTimerContext } from "@/context/TimerContext";

type FinishWorkoutFormProps = {
  previous: Workout[] | [];
  initialSession: WorkoutSession;
  recentWorkouts: Workout[];
};

const FinishWorkoutForm = ({
  previous,
  initialSession,
  recentWorkouts,
}: FinishWorkoutFormProps) => {
  const [notes, setNotes] = useState<string>("");
  const [addNote, setAddNote] = useState<string | boolean>(false);
  const [sessionOptions, setSessionOptions] = useState(false);
  const [workoutName, setWorkoutName] = useState("");
  const [setOptions, setSetOptions] = useState<string | null>(null);
  const [setIndex, setSetIndex] = useState<number>(0);
  const [session, setSession] = useState<WorkoutSession>(initialSession);
  const [addExercise, setAddExercise] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | boolean>(false);
  const [replace, setReplace] = useState(false);
  const router = useRouter();
  const { time } = useTimerContext();

  const addAnotherExercise = async (data: FormData) => {
    const dataLbs = Object.values(data.getAll("lbs")?.valueOf());
    const dataReps = Object.values(data.getAll("reps")?.valueOf());

    session.Workout?.map(({ lbs, reps }) => {
      lbs.map((_, id) => {
        lbs.splice(id, 1, Number(dataLbs[0]));
        dataLbs.shift();
        reps.splice(id, 1, Number(dataReps[0]));
        dataReps.shift();
      });
    });
    setSession(session);

    try {
      const name = workoutName ?? session.name;
      await updateWorkoutSession(session.id, name, notes, time);
      await updateWorkouts(session);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (data: FormData) => {
    const dataLbs = Object.values(data.getAll("lbs")?.valueOf());
    const dataReps = Object.values(data.getAll("reps")?.valueOf());

    session.Workout?.map(({ lbs, reps }) => {
      lbs.map((_, id) => {
        lbs.splice(id, 1, Number(dataLbs[0]));
        dataLbs.shift();
        reps.splice(id, 1, Number(dataReps[0]));
        dataReps.shift();
      });
    });
    setSession(session);

    try {
      const name = workoutName ?? session.name;
      await updateWorkoutSession(session.id, name, notes, time);
      await updateWorkouts(session);
      router.push("/workouts");
    } catch (error) {
      console.log(error);
    }
  };

  const addSet = async (id: string) => {
    const workout = session.Workout.filter((workout) => workout.id === id);
    const { sets, lbs, reps, notes } = workout[0];
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
      await updateWorkout(id, sets, lbs, reps, notes);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const changeSet = async (id: string, e: MouseEvent) => {
    const workout = session.Workout.filter((workout) => workout.id === id);
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
    try {
      const workout = session.Workout.filter((workout) => workout.id === id);
      const { sets, lbs, reps } = workout[0];
      sets.splice(setId, 1);
      lbs.splice(setId, 1);
      reps.splice(setId, 1);
      if (!sets.length) {
        sets.push("1");
        lbs.push(0);
        reps.push(0);
      }
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

  const handleNotes = (query: string, id: string) => {};

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
                <div>
                  {session?.notes || <p className="opacity-25">Notes</p>}
                </div>
              </div>
            </div>
          </div>
          {session.Workout.map(
            ({ id, name, sets, lbs, reps, notes, bodyPart }, index) => (
              <div key={id}>
                <div className="flex flex-row items-center  my-4">
                  <h1 className="flex-1 text-2xl font-bold">{name}</h1>
                  <div className="flex-initial w-fit">
                    <div className="relative">
                      <MenuOptions
                        id={id}
                        setAddNote={setAddNote}
                        replace={replace}
                        openMenu={openMenu}
                        setNotes={setNotes}
                        setOpenMenu={setOpenMenu}
                        setReplace={setReplace}
                        removeExercise={removeExercise}
                      />
                    </div>
                    <div onClick={() => setOpenMenu(id)}>
                      <SlOptions className="flex w-fit bg-gray-400 rounded-md px-2 right-0" />
                    </div>
                  </div>
                </div>
                <div className={addNote === id ? "" : "hidden"}>
                  <input
                    type="text"
                    name="notes"
                    className="bg-white rounded-md w-full"
                    onChange={(e) => handleNotes(e.target.value, id)}
                  />
                </div>
                <ReplaceBtn
                  id={id}
                  replace={replace}
                  setReplace={setReplace}
                  setOpenMenu={setOpenMenu}
                  removeExercise={removeExercise}
                  setAddExercise={setAddExercise}
                />
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
                <WorkoutSlider
                  id={id}
                  index={index}
                  sets={sets}
                  lbs={lbs}
                  reps={reps}
                  session={session}
                  previous={previous}
                />
                <div className="workout-form__btn">
                  <CustomButton
                    title="Add Set"
                    containerStyles="workout-form__add-btn"
                    handleClick={() => addSet(id)}
                  />
                </div>
              </div>
            ),
          )}
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
      session={session}
      setAddExercise={setAddExercise}
      setSession={setSession}
      recentWorkouts={recentWorkouts}
    />
  );
};

export default FinishWorkoutForm;
