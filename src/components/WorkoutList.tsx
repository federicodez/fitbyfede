import { RemoveBtn, WorkoutCard } from "./";
import Link from "next/link";
import { HiPencilAlt, HiOutlineTrash } from "react-icons/hi";
import moment from "moment";
import { prisma } from "@/db";
import { CircleLoader } from "@/components";

export default async function WorkoutList() {
  const workouts = await prisma.workout.findMany();
  return workouts.length ? (
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
  ) : (
    <>
      <h1 className="home-title">Start Workout</h1>
      <Link href="/searchWorkout" className="home-link">
        Start an Empty Workout
      </Link>
      <div className="workoutlist">
        <div className="container workoutlist-item">
          <div className="workoutlist-btn">
            <div className="workoutlist-btn">
              <HiOutlineTrash />
              <Link href="#">
                <HiPencilAlt />
              </Link>
            </div>
            <div className="workoutlist-date">Wednesday, Sep 5th</div>
            <div className="workoutlist-exercise">
              <strong>Squat</strong>
            </div>
            <div className="workout-card wrapper">
              <div className="workout-card-list">
                <div className="workout-card-item">
                  <div className="workout-card__set-id">1</div>
                  <div className="workout-card__lbs">205</div>
                  <div className="workout-card__lbs-label">lbs</div>
                  <div className="workout-card__X">x</div>
                  <div className="workout-card__reps">10</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
