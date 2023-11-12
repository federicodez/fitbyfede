import { exampleWorkout } from "@/constants";
import Link from "next/link";
import moment from "moment";
import { SlOptions } from "react-icons/sl";

const EmptyState = () => {
  return (
    <section>
      <Link href="/search-workout" className="home-link">
        Start a Workout
      </Link>
      <ul className="workoutlist">
        {exampleWorkout?.map(({ id, name, sets, lbs, reps, createdAt }) => (
          <li key={id} className="container workoutlist-item">
            <div className="wrapper my-2 p-2 rounded-lg border-[#8ebbff] border-4 p-color">
              <p>Example Workout</p>
              <div className="flex justify-between">
                {moment(createdAt).format("dddd, MMM Do")}
                <div>
                  <SlOptions className="text-[#8ebbff] text-xl mr-2" />
                </div>
              </div>
              <div>
                <strong className="flex flex-start">Exercise</strong>
                <div className="flex flex-row gap-2">
                  <div className="workout-card-list">{sets.length}</div>
                  <span>x</span>
                  <span>{name}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default EmptyState;
