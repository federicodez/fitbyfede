import { RemoveBtn, WorkoutCard } from "./";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import moment from "moment";
import { getWorkouts } from "@/utils";
import { Workout } from "@/types";
import { prisma } from "@/db";

export default async function WorkoutList() {
  // const { workouts }: { workouts: Workout | null } = await getWorkouts();
  // const workout = await prisma.workout.create({
  //   data: {
  //     exercise: "bench",
  //     lbs: [135],
  //     reps: [10],
  //     userId: "d58ad89e-a8d4-43ca-80c1-535e5878218a",
  //   },
  // });
  const workouts = await prisma.workout.findMany();
  return (
    <section>
      <h1 className="home-title">Start Workout</h1>
      <Link href="/searchWorkout" className="home-link">
        Start an Empty Workout
      </Link>
      <ul className="workoutlist">
        {workouts?.map(({ id, exercise, lbs, reps, createdAt }) => (
          <li key={id} className="container workoutlist-item">
            <div className="workoutlist-btn">
              <RemoveBtn id={id} />
              <Link href={`/editWorkout/${id}`}>
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
