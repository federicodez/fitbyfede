import { exampleWorkout } from "@/constants";
import Link from "next/link";
import moment from "moment";
import WorkoutCard from "@/app/workouts/components/WorkoutCard";
import { SlOptions } from "react-icons/sl";

const EmptyState = () => {
  return (
    <section>
      <Link href="/search-workout" className="home-link">
        Start a Workout
      </Link>
      <ul className="workoutlist">
        <p>Example Workout</p>
        {exampleWorkout?.map(({ id, name, sets, lbs, reps, createdAt }) => (
          <li key={id} className="container workoutlist-item">
            <div className="workoutlist-btn">
              <SlOptions />
            </div>
            <div className="workoutlist-date">
              {moment(createdAt).format("dddd, MMM Do")}
            </div>
            <div className="workoutlist-exercise">
              <strong>{name}</strong>
            </div>
            <WorkoutCard sets={sets} lbs={lbs} reps={reps} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default EmptyState;
