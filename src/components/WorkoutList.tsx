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
      <ul className="workouts">
        {workouts?.map(({ exercise, lbs, reps, notes, createdAt, _id }) => (
          <li key={_id} className="container card">
            <div className="btn">
              <RemoveBtn id={_id} />
              <Link href={`/editWorkout/${_id}`}>
                <HiPencilAlt />
              </Link>
            </div>
            <div>{moment(createdAt).format("dddd, MMM Do")}</div>
            <div className="exercise">
              <strong>{exercise}</strong>
            </div>
            <WorkoutCard lbs={lbs} reps={reps} />
          </li>
        ))}
      </ul>
    </section>
  );
}
