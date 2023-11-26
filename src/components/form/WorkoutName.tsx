import { WorkoutSession } from "@/types";
import { useState, useEffect, useRef } from "react";

type WorkoutNameProps = {
  session: WorkoutSession;
  workoutName: string;
  setWorkoutName: React.Dispatch<React.SetStateAction<string>>;
  isWorkoutNameOpen: boolean;
  setIsWorkoutNameOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const WorkoutName = ({
  session,
  workoutName,
  setWorkoutName,
  isWorkoutNameOpen,
  setIsWorkoutNameOpen,
}: WorkoutNameProps) => {
  const nameRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isWorkoutNameOpen) return;
    const checkIfClickedOutside = (e: MouseEvent | TouchEvent) => {
      if (
        nameRef?.current &&
        !nameRef?.current?.contains(e.target as HTMLElement)
      ) {
        setIsWorkoutNameOpen(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [nameRef, isWorkoutNameOpen, setIsWorkoutNameOpen]);
  return (
    <>
      {isWorkoutNameOpen ? (
        <div ref={nameRef}>
          <input
            value={workoutName}
            type="text"
            placeholder={session?.name}
            className="text-black bg-white rounded-md w-full"
            onChange={(e) => setWorkoutName(e.target.value)}
          />
        </div>
      ) : (
        <div role="button" onClick={() => setIsWorkoutNameOpen(true)}>
          {workoutName ? workoutName : session?.name}
        </div>
      )}
    </>
  );
};

export default WorkoutName;
