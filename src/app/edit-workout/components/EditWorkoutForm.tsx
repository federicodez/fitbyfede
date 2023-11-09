"use client";

import { useState, Suspense, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Workout, WorkoutSession } from "@/types";
import { CustomButton, ReplaceBtn } from "@/components";
import {
  updateWorkout,
  updateWorkoutSession,
  updateWorkouts,
  updateDate,
  deleteSession,
  deleteWorkout,
} from "@/actions";
import LoadingModel from "@/components/models/LoadingModel";
import { HiX } from "react-icons/hi";
import { SlOptions } from "react-icons/sl";
import moment from "moment";
import AddExercise from "./AddExercise";
import WorkoutSlider from "./WorkoutSlider";
import MenuOptions from "./MenuOptions";
import { AiFillEdit } from "react-icons/ai";

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
  const [notes, setNotes] = useState<string>("");
  const [noteIds, setNoteIds] = useState<string[]>([]);
  const [sessionOptions, setSessionOptions] = useState(false);
  const [workoutName, setWorkoutName] = useState("");
  const [dateInput, setDateInput] = useState(false);
  const [addExercise, setAddExercise] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | boolean>(false);
  const [replace, setReplace] = useState(false);
  const [session, setSession] = useState<WorkoutSession>(initialSession);
  const router = useRouter();

  const hours = Math.floor(session?.time / 360000);
  const minutes = Math.floor((session?.time % 360000) / 6000);
  const seconds = Math.floor((session?.time % 6000) / 100);

  const addAnotherExercise = async (data: FormData) => {
    const dataLbs = Object.values(data.getAll("lbs")?.valueOf());
    const dataReps = Object.values(data.getAll("reps")?.valueOf());

    session.Workout.map(({ lbs, reps }) => {
      lbs.map((_, id) => {
        lbs.splice(id, 1, Number(dataLbs[0]));
        dataLbs.shift();
        reps.splice(id, 1, Number(dataReps[0]));
        dataReps.shift();
      });
    });
    setSession(session);

    try {
      if (workoutName) {
        await updateWorkoutSession(
          session.id,
          workoutName,
          notes,
          session.time,
        );
      } else {
        await updateWorkoutSession(
          session.id,
          session?.name,
          notes,
          session.time,
        );
      }
      await updateWorkouts(session);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (data: FormData) => {
    const dataLbs = Object.values(data.getAll("lbs")?.valueOf());
    const dataReps = Object.values(data.getAll("reps")?.valueOf());
    const date = data.get("date")?.valueOf();

    session.Workout.map(({ lbs, reps, notes }) => {
      lbs.map((_, idx) => {
        lbs.splice(idx, 1, Number(dataLbs[0]));
        dataLbs.shift();
        reps.splice(idx, 1, Number(dataReps[0]));
        dataReps.shift();
      });
    });
    setSession(session);

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
        await updateDate(session, date);
      } else {
        await updateWorkouts(session);
      }
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

  const removeWorkout = async () => {
    await deleteSession(session.id);
    router.push("/workouts");
  };

  const removeExercise = async (id: string) => {
    await deleteWorkout(id);
    router.refresh();
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
    <Suspense fallback={<LoadingModel />}>
      <div className="wrapper container pb-20">
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
          {session.Workout.map(
            ({ id, name, sets, lbs, reps, bodyPart }, index) => (
              <div key={id} className="">
                <div className="flex flex-row items-center my-4">
                  <h1 className="flex-1 text-2xl font-bold">{name}</h1>

                  <div className="flex-initial w-fit">
                    <div className="relative">
                      <MenuOptions
                        id={id}
                        noteIds={noteIds}
                        setNoteIds={setNoteIds}
                        replace={replace}
                        openMenu={openMenu}
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

                <div className={noteIds.includes(id) ? "" : "hidden"}>
                  <input
                    type="text"
                    name={id}
                    className="bg-white rounded-md w-full"
                    onChange={(e) => handleNotes(e)}
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
                    handleClick={() => addSet(id)}
                    containerStyles="workout-form__add-btn"
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
