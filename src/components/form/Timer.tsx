import { WorkoutSession } from "@/types";
import { BiTimer } from "react-icons/bi";

type TimerProps = {
  session: WorkoutSession;
};

const Timer = ({ session }: TimerProps) => {
  const hours = Math.floor(session?.time / 360000);
  const minutes = Math.floor((session?.time % 360000) / 6000);
  const seconds = Math.floor((session?.time % 6000) / 100);
  return (
    <div className="flex flex-row items-center">
      <BiTimer role="none" className="flex w-fit rounded-md px-1" />
      {hours ? `${hours}:` : ""}
      {minutes.toString().padStart(2)}:{seconds.toString().padStart(2, "0")}
    </div>
  );
};

export default Timer;
