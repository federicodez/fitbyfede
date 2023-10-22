import moment from "moment";
import Link from "next/link";
import { HiX } from "react-icons/hi";

type DetailedProps = {
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
        <Link href={`/edit-workout/${sessionId}`} className="flex flex-row">
          <span className="text-lg text-blue-500">Edit</span>
        </Link>
      </div>
      {moment(date).format("llll")}
      {ids?.map((id: string, idIndex: number) => (
        <div key={idIndex} className="flex flex-col my-4 ">
          <div className="my-2">
            <strong>{exercises[id]}</strong>
          </div>
          <ul className="workout-card-list">
            {lbs[id]?.map((lb: number, lbIndex: number) => (
              <li
                key={lbIndex}
                className="workout-card-item flex justify-center items-center"
              >
                <div className="">{sets[id][lbIndex]}</div>
                <div className="">
                  {lb
                    ? `${lb} lbs x ${reps[id][lbIndex]}`
                    : `${reps[id][lbIndex]} reps`}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Detailed;
