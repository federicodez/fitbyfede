import { useState, useEffect, useRef } from "react";

type WorkoutDateProps = {
  dateInput: string;
  setDateInput: React.Dispatch<React.SetStateAction<string>>;
  isDateOpen: boolean;
  setIsDateOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const WorkoutDate = ({
  dateInput,
  setDateInput,
  isDateOpen,
  setIsDateOpen,
}: WorkoutDateProps) => {
  const dateRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isDateOpen) return;
    const checkIfClickedOutside = (e: MouseEvent | TouchEvent) => {
      if (
        dateRef?.current &&
        !dateRef?.current?.contains(e.target as HTMLElement)
      ) {
        setIsDateOpen(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [dateRef, isDateOpen, setIsDateOpen]);

  return (
    isDateOpen && (
      <div ref={dateRef}>
        <input
          name="date"
          type="datetime-local"
          className="rounded-md text-black"
        />
      </div>
    )
  );
};
export default WorkoutDate;
