import { exampleWorkout } from "@/constants";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi";
import moment from "moment";
import WorkoutCard from "@/app/workouts/components/WorkoutCard";

const EmptyState = () => {
  return (
    <section>
      <Link href="/search-workout" className="home-link">
        Start a Workout
      </Link>
      <ul className="workoutlist">
        {exampleWorkout?.map(({ id, exercise, sets, lbs, reps, createdAt }) => (
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
            <WorkoutCard sets={sets} lbs={lbs} reps={reps} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default EmptyState;
