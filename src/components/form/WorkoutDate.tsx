import { WorkoutSession } from "@/types";
import moment from "moment";
import { useEffect, useRef } from "react";
import { updateSessionDate } from "@/actions/workouts";

type WorkoutDateProps = {
  session: WorkoutSession;
  dateInput: Date | null;
  setDateInput: React.Dispatch<React.SetStateAction<Date | null>>;
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

  const handleDateChange = async (value: string) => {
    const updated = await updateSessionDate(session.id, value);
    if (updated) {
      setDateInput(updated?.createdAt);
      setIsDateOpen(false);
    }
  };

  return isDateOpen ? (
    <div ref={dateRef}>
      <input
        value={`${dateInput}`}
        type="datetime-local"
        className="text-black rounded-md"
        onChange={(e) => handleDateChange(e.target.value)}
      />
    </div>
  ) : (
    <div onClick={() => setIsDateOpen(true)}>
      {dateInput
        ? moment(dateInput).calendar()
        : moment(session?.createdAt).calendar()}
    </div>
  );
};
export default WorkoutDate;
