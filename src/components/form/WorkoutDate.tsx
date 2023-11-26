import { WorkoutSession } from "@/types";
import moment from "moment";
import { useState, useEffect, useRef } from "react";

type WorkoutDateProps = {
  date: WorkoutSession;
  dateInput: string;
  setDateInput: React.Dispatch<React.SetStateAction<string>>;
  isDateOpen: boolean;
  setIsDateOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const WorkoutDate = ({
  date,
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

  const handleDate = (value: string) => {
    const date = moment(new Date(value)).format("YYYY-MM-DD");
    setDateInput(date);
  };

  return isDateOpen ? (
    <div ref={dateRef}>
      <input
        type="datetime-local"
        value={dateInput}
        className="rounded-md text-black"
        onChange={(e) => handleDate(e.target.value)}
      />
    </div>
  ) : (
    <div onClick={() => setIsDateOpen(true)}>
      {dateInput ? dateInput : moment(date.createdAt).calendar()}
    </div>
  );
};
export default WorkoutDate;
