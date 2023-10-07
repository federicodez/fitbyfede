import { RemoveBtn } from "@/components";
import { Workout } from "@/types";
import moment from "moment";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

type WorkoutCardProps = {
  id: string;
  exercise: string;
  sets: string[];
  lbs: number[];
  reps: number[];
  createdAt: Date | string;
  setWorkouts: React.Dispatch<React.SetStateAction<Workout[]>>;
};

const WorkoutCard = ({
  id,
  exercise,
  sets,
  lbs,
  reps,
  createdAt,
  setWorkouts,
}: WorkoutCardProps) => {
  return (
    <>
      <div className="workoutlist-btn">
        <RemoveBtn id={id} setWorkouts={setWorkouts} />
        <Link href={`/edit-workout/${id}`}>
          <HiPencilAlt className="workoutlist__edit-btn" />
        </Link>
      </div>
      <div className="workoutlist-date">
        {moment(createdAt).format("dddd, MMM Do")}
      </div>
      <div className="workoutlist-exercise">
        <strong>{exercise}</strong>
      </div>
      <div className="workout-card wrapper">
        <ul className="workout-card-list">
          {sets?.map((set: string, id: number) => (
            <li key={id} className="workout-card-item">
              <div className="workout-card__set-id">{set}</div>
              <div className="workout-card__lbs-label">lbs</div>
            </li>
          ))}
        </ul>
        <ul className="workout-card-list">
          {lbs?.map((lb: number, id: number) => (
            <li key={id} className="workout-card-item">
              <div className="workout-card__lbs">{lb}</div>
              <div className="workout-card__lbs-label">lbs</div>
            </li>
          ))}
        </ul>
        <ul className="workout-card-list">
          {reps?.map((rep: number, id: number) => (
            <li key={id} className="workout-card-item">
              <div className="workout-card__X">x</div>
              <div className="workout-card__reps">{rep}</div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default WorkoutCard;
