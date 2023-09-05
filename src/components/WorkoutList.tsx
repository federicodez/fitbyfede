import { RemoveBtn, WorkoutCard } from "./";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import moment from "moment";
import { getWorkouts } from "@/utils";
import { Workout } from "@/types";
import { prisma } from "@/db";

export default async function WorkoutList() {
  // const { workouts }: { workouts: Workout | null } = await getWorkouts();
  const workouts = await prisma.workout.findMany();
  return (
    <section>
      <h1 className="home-title">Start Workout</h1>
      <Link href="/searchWorkout" className="home-link">
        Start an Empty Workout
      </Link>
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
