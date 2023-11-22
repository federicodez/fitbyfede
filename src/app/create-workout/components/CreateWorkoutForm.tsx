"use client";

import { useState, Suspense, ChangeEvent, MouseEvent } from "react";
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
  changeWorkoutSet,
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
  const [sessionNotes, setSessionNotes] = useState("");
  const [sessionOptions, setSessionOptions] = useState(false);
  const [dateInput, setDateInput] = useState(false);
  const [noteIds, setNoteIds] = useState<string[]>([]);
  const [workoutName, setWorkoutName] = useState("");
  const [addExercise, setAddExercise] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | boolean>(false);
  const [replace, setReplace] = useState<string | boolean>(false);
  const [setOptions, setSetOptions] = useState<string | null>(null);
  const [setId, setSetId] = useState(0);
  const [setIndex, setSetIndex] = useState(0);
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

  const changeSet = async (id: string, e: MouseEvent) => {
    const { target } = e;
    if (target) {
      const set = (target as HTMLButtonElement).value;
      const updated = await changeWorkoutSet(id, session, setIndex, set);
      if (updated) {
        setSession(updated);
        router.refresh();
      }
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
            className="text-[#c1121f] px-6 rounded-md bg-red-300"
            onClick={removeWorkout}
          >
            <HiX role="none" />
          </button>
          <h1 className="font-semibold text-xl">Create Workout</h1>
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
                  className="bg-white text-black rounded-md w-full"
                  onChange={(e) => setWorkoutName(e.target.value)}
                />
              </div>
            ) : (
              <div
                role="button"
                onClick={() => setWorkoutName(" ")}
                className=""
              >
                {session?.name}
              </div>
            )}
            <HeaderMenu
              sessionOptions={sessionOptions}
              setSessionOptions={setSessionOptions}
              setWorkoutName={setWorkoutName}
              setDateInput={setDateInput}
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
            setOptions={setOptions}
            setSetOptions={setSetOptions}
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
