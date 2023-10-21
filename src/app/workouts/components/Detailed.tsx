import Link from "next/link";
import { HiX } from "react-icons/hi";

type DetailedProps = {
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
    <div className="absolute wrapper z-10 rounded-md bg-white shadow-[inset_0_-3em_3em_rgba(0,0,0,0.1),0.3em_0.3em_1em_rgba(0,0,0,0.3)]">
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

      {ids?.reverse().map((id: string, idIndex: number) => (
        <div key={idIndex} className="grid grid-cols-3 my-4 ">
          <div className="grid col-span-3 my-2">
            <strong>{exercises[id]}</strong>
          </div>
          <ul className="workout-card-list">
            {sets[id]?.map((set: string, setIndex: number) => (
              <li
                key={setIndex}
                className="workout-card-item flex justify-end items-center"
              >
                <div className="workout-card__set-label">Set</div>
                <div className="workout-card__set-id">{set}</div>
              </li>
            ))}
          </ul>
          <ul className="workout-card-list">
            {lbs[id]?.map((lb: number, lbIndex: number) => (
              <li
                key={lbIndex}
                className="workout-card-item flex justify-center items-center"
              >
                <div className="workout-card__lb">{lb}</div>
                <div className="workout-card__lbs-label">lbs</div>
              </li>
            ))}
          </ul>
          <ul className="workout-card-list">
            {reps[id]?.map((rep: number, repIndex: number) => (
              <li
                key={repIndex}
                className="workout-card-item flex justify-start items-center"
              >
                <div className="workout-card__X">x</div>
                <div className="workout-card__reps">{rep}</div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Detailed;
