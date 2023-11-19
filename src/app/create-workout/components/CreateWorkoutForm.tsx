"use client";

import { useState, Suspense, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Workout, WorkoutSession } from "@/types";
import { AddExercise, StartTimer } from "@/components";
import LoadingModel from "@/components/models/LoadingModel";
import { HeaderMenu, WorkoutCard } from "@/components/form";
import {
  updateWorkout,
  updateManyWorkouts,
  deleteSession,
  deleteWorkout,
  updateWorkoutSession,
} from "@/actions/workouts";
import { SlOptions } from "react-icons/sl";
import { HiX } from "react-icons/hi";
import { useTimerContext } from "@/context/TimerContext";

type CreateWorkoutFormProps = {
  previous: Workout[] | [];
  initialSession: WorkoutSession;
  recentWorkouts: Workout[];
};

const CreateWorkoutForm = ({
  previous,
  initialSession,
  recentWorkouts,
}: CreateWorkoutFormProps) => {
  const [session, setSession] = useState<WorkoutSession>(initialSession);
  const [sessionNotes, setSessionNotes] = useState<string | boolean>(false);
  const [sessionOptions, setSessionOptions] = useState(false);
  const [dateInput, setDateInput] = useState(false);
  const [noteIds, setNoteIds] = useState<string[]>([]);
  const [workoutName, setWorkoutName] = useState<string | boolean>(false);
  const [addExercise, setAddExercise] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | boolean>(false);
  const [replace, setReplace] = useState<string | boolean>(false);
  const router = useRouter();
  const { time } = useTimerContext();

  const addAnotherExercise = async (data: FormData) => {
    const dataLbs = Object.values(data.getAll("lbs")?.valueOf());
    const dataReps = Object.values(data.getAll("reps")?.valueOf());

    try {
      const name = workoutName ?? session.name;
      await updateWorkoutSession(session.id, name, sessionNotes, time);
      await updateManyWorkouts(session, dataLbs, dataReps);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (data: FormData) => {
    const dataLbs = Object.values(data.getAll("lbs")?.valueOf());
    const dataReps = Object.values(data.getAll("reps")?.valueOf());

    try {
      const name = workoutName ?? session.name;
      await updateWorkoutSession(session.id, name, sessionNotes, time);
      await updateManyWorkouts(session, dataLbs, dataReps);
      router.push("/workouts");
    } catch (error) {
      console.log(error);
    }
  };

  const addSet = async (
    id: string,
    sets: string[],
    lbs: number[],
    reps: number[],
  ) => {
    try {
      const updated = await updateWorkout(id, sets, lbs, reps);
      if (updated) {
        setSession(updated);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeWorkout = async () => {
    await deleteSession(session.id);
    router.push("/workouts");
  };

  const removeExercise = async (id: string) => {
    const session = await deleteWorkout(id);
    if (session) {
      setSession(session);
      router.refresh();
    }
  };

  const handleNotes = (e: ChangeEvent) => {
    setSession((prev) => {
      const updated = prev.Workout.map((workout) =>
        workout.id === (e.target as HTMLInputElement).name
          ? {
              ...workout,
              notes: (e.target as HTMLInputElement).value,
            }
          : workout,
      );
      return { ...prev, Workout: updated };
    });
  };

  return !addExercise ? (
    <div className="m-5 p-2 p-color rounded-md shadow-[inset_0_-3em_3em_rgba(0,0,0,0.1),0_0_0_2px_rgb(255,255,255),0.3em_0.3em_1em_rgba(0,0,0,0.3)]">
      <form rel="noopener" action={handleSubmit}>
        <div className="flex flex-row justify-between">
          <button
            type="button"
            className="text-[#c1121f] px-4 py-0 rounded-md bg-red-300"
            onClick={removeWorkout}
          >
            <HiX role="presentation" />
          </button>
          <h1>Create Workout</h1>
          <button
            type="submit"
            className="bg-blue-300 text-blue-950 rounded-md px-2"
          >
            Finish
          </button>
        </div>
        <div className="flex my-4 flex-col">
          <div className="flex flex-row items-center gap-2">
            {workoutName ? (
              <div className={!workoutName ? "hidden" : ""}>
                <input
                  type="text"
                  className="bg-white rounded-md w-full"
                  onChange={(e) => setWorkoutName(e.target.value)}
                />
              </div>
            ) : (
              <strong role="button" onClick={() => setWorkoutName(" ")}>
                {session?.name}
              </strong>
            )}
            <div
              className={
                sessionOptions
                  ? "absolute w-fit z-10 bg-[#8ebbff] text-[#2f3651] rounded-lg p-2 cursor-pointer"
                  : "hidden"
              }
            >
              <HeaderMenu
                setSessionOptions={setSessionOptions}
                setWorkoutName={setWorkoutName}
                setDateInput={setDateInput}
              />
            </div>
            <SlOptions
              role="button"
              onClick={() => setSessionOptions(true)}
              className="flex w-10 bg-gray-300 text-black rounded-md px-2 right-0"
            />
          </div>
          <div>
            <div className="flex flex-col gap-2">
              <div className="relative left-0">
                <StartTimer />
              </div>
              <div>{session?.notes || <p className="opacity-25">Notes</p>}</div>
            </div>
          </div>
        </div>

        <Suspense fallback={<LoadingModel />}>
          <WorkoutCard
            session={session}
            setSession={setSession}
            previous={previous}
            noteIds={noteIds}
            setNoteIds={setNoteIds}
            replace={replace}
            setReplace={setReplace}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            setAddExercise={setAddExercise}
            removeExercise={removeExercise}
            handleNotes={handleNotes}
            addSet={addSet}
          />
        </Suspense>
        <div className="workout-form__btn">
          <button
            type="submit"
            className="rounded-md bg-blue-300 text-blue-900"
            formAction={(data) => {
              setAddExercise(true);
              addAnotherExercise(data);
            }}
          >
            Add Exercise
          </button>
          <button
            onClick={removeWorkout}
            className="rounded-md bg-red-300 text-red-900"
          >
            Cancel Workout
          </button>
        </div>
      </form>
    </div>
  ) : (
    <AddExercise
      session={session}
      setAddExercise={setAddExercise}
      setSession={setSession}
      recentWorkouts={recentWorkouts}
    />
  );
};

export default CreateWorkoutForm;
