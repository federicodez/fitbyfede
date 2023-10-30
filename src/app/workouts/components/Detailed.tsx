import moment from "moment";
import Link from "next/link";
import { HiX } from "react-icons/hi";
import { IoIosTimer } from "react-icons/io";
import { FaWeightHanging } from "react-icons/fa";
import { WorkoutSession } from "@/types";

type DetailedProps = {
  session: WorkoutSession;
  date: Date;
  ids: any[];
  exercises: {
    [key: string]: string;
  };
  sets: {
    [key: string]: string[];
  };
  lbs: {
    [key: string]: number[];
  };
  reps: {
    [key: string]: number[];
  };
  sessionId?: string;
  setShowWorkouts: React.Dispatch<React.SetStateAction<string | boolean>>;
  setShowSessions: React.Dispatch<React.SetStateAction<boolean>>;
};

const Detailed = ({
  session,
  date,
  ids,
  exercises,
  sets,
  lbs,
  reps,
  sessionId,
  setShowWorkouts,
  setShowSessions,
}: DetailedProps) => {
  const hours = Math.floor(session.time / 360000);
  const minutes = Math.floor((session.time % 360000) / 6000);
  const seconds = Math.floor((session.time % 6000) / 100);
  const lbSum = ids.map((id) =>
    lbs[id].reduce((acc, curr) => {
      return acc + curr;
    }, 0),
  );
  const repSum = ids.map((id) =>
    reps[id].reduce((acc, curr) => {
      return acc + curr;
    }, 0),
  );
  const sum = lbSum[0] * repSum[0];

  return (
    <div className="absolute z-10 rounded-md bg-gray-100 w-full shadow-[inset_0_-3em_3em_rgba(0,0,0,0.1),0.3em_0.3em_1em_rgba(0,0,0,0.3)]">
      <div className="flex flex-row justify-between m-2">
        <button
          className="bg-gray-400 px-2 py-1 rounded-md"
          onClick={() => {
            setShowWorkouts(false);
            setShowSessions(true);
          }}
        >
          <HiX />
        </button>
        {session?.name}
        <Link href={`/edit-workout/${sessionId}`} className="flex flex-row">
          <span className="text-lg text-blue-500">Edit</span>
        </Link>
      </div>
      <div className="flex flex-col">
        <span>{moment(date).format("llll")}</span>
        <div className="flex flex-row justify-evenly">
          <span className="flex flex-row gap-2 justify-center items-center">
            <IoIosTimer className="w-fit" />
            {hours ? `${hours}:` : ""}
            {minutes.toString().padStart(2)}:
            {seconds.toString().padStart(2, "0")}
          </span>
          <span className="flex flex-row gap-2 justify-center items-center">
            <FaWeightHanging />
            {sum}
          </span>
        </div>
      </div>
      {ids?.map((id: string, idIndex: number) => (
        <div key={idIndex} className="flex flex-col my-4 ">
          <div className="flex flex-row justify-evenly my-2">
            <strong>{exercises[id]}</strong>
            <strong>1RM</strong>
          </div>
          <ul className="workout-card-list">
            {lbs[id]?.map((lb: number, lbIndex: number) => (
              <li
                key={lbIndex}
                className="workout-card-item flex justify-evenly items-center"
              >
                <div className="flex flex-row gap-5">
                  <div className="">{sets[id][lbIndex]}</div>
                  <div className="">
                    {lb
                      ? `${lb} lbs x ${reps[id][lbIndex]}`
                      : `${reps[id][lbIndex]} reps`}
                  </div>
                </div>
                <div>{lb * (1 + reps[id][lbIndex] / 30)}</div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Detailed;
