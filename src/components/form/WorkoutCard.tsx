import { WorkoutSession, Workout } from "@/types";
import { MenuOptions, WorkoutSlider, SetOptions } from ".";
import { SlOptions } from "react-icons/sl";
import { ChangeEvent, MouseEvent, Ref } from "react";

type WorkoutCardProps = {
  session: WorkoutSession;
  setSession: React.Dispatch<React.SetStateAction<WorkoutSession>>;
  previous: Workout[];
  noteIds: string[];
  setNoteIds: React.Dispatch<React.SetStateAction<string[]>>;
  replace: string | boolean;
  setReplace: React.Dispatch<React.SetStateAction<string | boolean>>;
  openMenu: string | boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<string | boolean>>;
  setOptions: string | null;
  setSetOptions: React.Dispatch<React.SetStateAction<string | null>>;
  setAddExercise: React.Dispatch<React.SetStateAction<boolean>>;
  removeExercise: (id: string) => void;
  handleNotes: (e: ChangeEvent) => void;
  addSet: (id: string, sets: string[], lbs: number[], reps: number[]) => void;
};

const WorkoutCard = ({
  session,
  setSession,
  previous,
  noteIds,
  setNoteIds,
  replace,
  setReplace,
  openMenu,
  setOpenMenu,
  setOptions,
  setSetOptions,
  setAddExercise,
  removeExercise,
  handleNotes,
  addSet,
}: WorkoutCardProps) =>
  session?.Workout?.map(({ id, name, sets, lbs, reps, bodyPart }, index) => (
    <div key={id} className="">
      <div className="flex flex-row justify-between items-center my-4">
        <h1 className="capitalize flex text-2xl font-bold">{name}</h1>

        <div className="relative">
          <MenuOptions
            id={id}
            noteIds={noteIds}
            setNoteIds={setNoteIds}
            replace={replace}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
            setReplace={setReplace}
            setAddExercise={setAddExercise}
            removeExercise={removeExercise}
          />
          <div role="button" onClick={() => setOpenMenu(id)}>
            <SlOptions
              role="presentation"
              className="flex w-10 bg-gray-300 text-black rounded-md px-2 right-0"
            />
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

      <WorkoutSlider
        workoutId={id}
        index={index}
        sets={sets}
        lbs={lbs}
        reps={reps}
        session={session}
        setSession={setSession}
        previous={previous}
        bodyPart={bodyPart}
        setOptions={setOptions}
        setSetOptions={setSetOptions}
      />
      <div className="workout-form__btn">
        <button
          type="button"
          onClick={() => addSet(id, sets, lbs, reps)}
          className="mx-10 rounded-full bg-gray-300 text-black"
        >
          Add Set
        </button>
      </div>
    </div>
  ));
export default WorkoutCard;
