import { WorkoutSession } from "@/types";
import moment from "moment";
import { useEffect, useRef } from "react";
import { updateSessionDate } from "@/actions/workouts";

type WorkoutDateProps = {
  session: WorkoutSession;
  dateInput: string;
  setDateInput: React.Dispatch<React.SetStateAction<string>>;
  isDateOpen: boolean;
  setIsDateOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const WorkoutDate = ({
  session,
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

  const handleDate = async (value: string) => {
    const date = moment(value).format("YYYY-MM-DD");
    await updateSessionDate(session.id, date);
    setDateInput(date);
  };

  return isDateOpen ? (
    <div ref={dateRef}>
      <input
        type="date"
        value={dateInput}
        className="rounded-md text-black"
        onChange={(e) => handleDate(e.target.value)}
      />
    </div>
  ) : (
    <div onClick={() => setIsDateOpen(true)}>
      {dateInput ? dateInput : moment(session.createdAt).calendar()}
    </div>
  );
};
export default WorkoutDate;
