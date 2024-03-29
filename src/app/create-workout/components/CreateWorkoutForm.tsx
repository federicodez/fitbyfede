"use client";

/**
 * Code Sample
 * Lines 70 - 81
 * Lines 220 - 234
 */

import { useState, Suspense, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Workout, WorkoutSession } from "@/types";
import { AddExercise, StartTimer } from "@/components";
import LoadingModal from "@/components/modals/LoadingModal";
import {
  HeaderMenu,
  SessionNotes,
  WorkoutCard,
  WorkoutDate,
  WorkoutName,
} from "@/components/form";
import {
  updateWorkout,
  updateManyWorkouts,
  deleteSession,
  deleteWorkout,
  updateWorkoutSession,
} from "@/actions/workouts";
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
  const [dateInput, setDateInput] = useState<Date | null>(
    initialSession?.createdAt,
  );
  const [noteIds, setNoteIds] = useState<string[]>([]);
  const [workoutName, setWorkoutName] = useState(initialSession.name);
  const [addExercise, setAddExercise] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | boolean>(false);
  const [replace, setReplace] = useState<string | boolean>(false);
  const [setOptions, setSetOptions] = useState<string | null>(null);
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);
  const [isWorkoutNameOpen, setIsWorkoutNameOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isSessionNotesOpen, setIsSessionNotesOpen] = useState(false);

  const router = useRouter();
  const { time } = useTimerContext();

  /**
   * I wanted to be able to add another exercise without
   * losing the data the user entered. Lets say I just finished
   * adding info for a squat exercise, and now I'm going to do
   * some bench press. Well if I render the component AddExercise
   * without updating the workout session in the database then all
   * the information on squats I previously entered will be lost.
   * So updating the database with the data entered here is very important.
   */
  const addAnotherExercise = async (data: FormData) => {
    const dataLbs = Object.values(data.getAll("lbs")?.valueOf());
    const dataReps = Object.values(data.getAll("reps")?.valueOf());

    try {
      await updateWorkoutSession(session.id, workoutName, sessionNotes, time);
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
      await updateWorkoutSession(session.id, workoutName, sessionNotes, time);
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
    <div className="h-full cursor-pointer rounded-lg m-2 p-4 p-color">
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
          <StartTimer />
          <SessionNotes
            session={session}
            sessionNotes={sessionNotes}
            setSessionNotes={setSessionNotes}
            isSessionNotesOpen={isSessionNotesOpen}
            setIsSessionNotesOpen={setIsSessionNotesOpen}
          />
        </div>

        <Suspense fallback={<LoadingModal />}>
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
        <div className="flex flex-col gap-5 my-4">
          <button
            type="submit"
            className="rounded-md bg-blue-300 text-blue-900"
            /**
             * Changing state so AddExercise below renders
             * Then invoking a function from line 70 with the data entered
             * that will update the workout session in the database
             */
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
    /*
     * Renders only if the state property addExercise is set to true
     */
    <AddExercise
      session={session}
      setAddExercise={setAddExercise}
      setSession={setSession}
      recentWorkouts={recentWorkouts}
    />
  );
};

export default CreateWorkoutForm;
