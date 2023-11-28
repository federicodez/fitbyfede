"use client";

import { useState, Suspense, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Workout, WorkoutSession } from "@/types";
import { AddExercise } from "@/components";
import {
  HeaderMenu,
  SessionNotes,
  WorkoutCard,
  WorkoutDate,
  WorkoutName,
  Timer,
} from "@/components/form";
import LoadingModel from "@/components/models/LoadingModel";
import {
  updateWorkout,
  updateWorkoutSession,
  updateManyWorkouts,
  updateManyWorkoutsDate,
  deleteSession,
  deleteWorkout,
} from "@/actions/workouts";
import { HiX } from "react-icons/hi";

type EditWorkoutFormProps = {
  previous: Workout[] | [];
  initialSession: WorkoutSession;
  recentWorkouts: Workout[];
};

const EditWorkoutForm = ({
  previous,
  initialSession,
  recentWorkouts,
}: EditWorkoutFormProps) => {
  const date = initialSession;
  const [sessionNotes, setSessionNotes] = useState<string>("");
  const [noteIds, setNoteIds] = useState<string[]>([]);
  const [workoutName, setWorkoutName] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [addExercise, setAddExercise] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | boolean>(false);
  const [replace, setReplace] = useState<string | boolean>(false);
  const [session, setSession] = useState<WorkoutSession>(initialSession);
  const [setOptions, setSetOptions] = useState<string | null>(null);
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);
  const [isWorkoutNameOpen, setIsWorkoutNameOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isSessionNotesOpen, setIsSessionNotesOpen] = useState(false);

  const router = useRouter();

  const addAnotherExercise = async (data: FormData) => {
    const dataLbs = Object.values(data.getAll("lbs")?.valueOf());
    const dataReps = Object.values(data.getAll("reps")?.valueOf());

    try {
      const name = workoutName ?? session.name;
      await updateWorkoutSession(session.id, name, sessionNotes, session.time);
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
      await updateWorkoutSession(session.id, name, sessionNotes, session.time);
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
    <div className="h-screen cursor-pointer p-4 p-color">
      <form rel="noopener" action={handleSubmit}>
        <div className="flex flex-row justify-between">
          <button
            type="button"
            className="text-[#c1121f] px-4 py-0 rounded-md bg-red-300"
            onClick={() => router.push("/workouts")}
          >
            <HiX role="none" />
          </button>
          <h1 className="text-xl font-semibold">Edit Workout</h1>
          <button
            type="submit"
            className="bg-blue-300 text-blue-950 rounded-md px-2"
          >
            Save
          </button>
        </div>
        <div className="flex my-4 flex-col w-fit">
          <div className="flex flex-row items-center gap-4">
            <WorkoutName
              session={session}
              workoutName={workoutName}
              setWorkoutName={setWorkoutName}
              isWorkoutNameOpen={isWorkoutNameOpen}
              setIsWorkoutNameOpen={setIsWorkoutNameOpen}
            />
            <div className="relative w-fit">
              <HeaderMenu
                setWorkoutName={setWorkoutName}
                isWorkoutNameOpen={isWorkoutNameOpen}
                setIsWorkoutNameOpen={setIsWorkoutNameOpen}
                isDateOpen={isDateOpen}
                setIsDateOpen={setIsDateOpen}
                isHeaderOpen={isHeaderOpen}
                setIsHeaderOpen={setIsHeaderOpen}
                setSessionNotes={setSessionNotes}
                isSessionNotesOpen={isSessionNotesOpen}
                setIsSessionNotesOpen={setIsSessionNotesOpen}
              />
            </div>
          </div>
          <WorkoutDate
            session={session}
            dateInput={dateInput}
            setDateInput={setDateInput}
            isDateOpen={isDateOpen}
            setIsDateOpen={setIsDateOpen}
          />
          <SessionNotes
            session={session}
            sessionNotes={sessionNotes}
            setSessionNotes={setSessionNotes}
            isSessionNotesOpen={isSessionNotesOpen}
            setIsSessionNotesOpen={setIsSessionNotesOpen}
          />
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
            Delete Workout
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

export default EditWorkoutForm;
