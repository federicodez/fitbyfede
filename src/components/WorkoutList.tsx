import { RemoveBtn, WorkoutCard } from "./";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import moment from "moment";
import { getWorkouts } from "@/utils";
import { WorkoutProps } from "@/types";

export default async function WorkoutList() {
  const { workouts }: { workouts: WorkoutProps } = await getWorkouts();
  return (
    <section>
      <ul className="workoutlist">
        {workouts?.map(({ exercise, lbs, reps, notes, createdAt, _id }) => (
          <li key={_id} className="container workoutlist-item">
            <div className="workoutlist-btn">
              <RemoveBtn id={_id} />
              <Link href={`/editWorkout/${_id}`}>
                <HiPencilAlt />
              </Link>
            </div>
            <div className="workoutlist-date">
              {moment(createdAt).format("dddd, MMM Do")}
            </div>
            <div className="workoutlist-exercise">
              <strong>{exercise}</strong>
            </div>
            <WorkoutCard lbs={lbs} reps={reps} />
          </li>
        ))}
      </ul>
    </section>
  );
}
