import { exampleWorkout } from "@/constants";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi";
import moment from "moment";
import { WorkoutCard } from ".";

const EmptyState = () => {
  return (
    <section>
      <h1 className="home-title">Start Workout</h1>
      <Link href="/search-workout" className="home-link">
        Start an Empty Workout
      </Link>
      <ul className="workoutlist">
        {exampleWorkout?.map(({ id, exercise, lbs, reps, createdAt }) => (
          <li key={id} className="container workoutlist-item">
            <div className="workoutlist-btn">
              <HiOutlineTrash />
              <Link href={`/edit-workout/${id}`}>
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
};

export default EmptyState;
