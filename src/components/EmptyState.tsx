import { exampleWorkout } from "@/constants";
import Link from "next/link";
import moment from "moment";
import { SlOptions } from "react-icons/sl";

const EmptyState = () => {
  return (
    <section>
      <Link
        rel="noopener"
        aria-label="start a workout"
        href="/search-workout"
        className={`
          flex 
          justify-center 
          items-center 
          font-bold 
          rounded-full
          w-80
          mx-auto
          my-5
          bg-[#8ebbff]
          text-[#2f3651]
          sm:mx-auto
        `}
      >
        Start a Workout
      </Link>
      <ul className="workoutlist">
        {exampleWorkout?.map(({ id, name, sets, createdAt }) => (
          <li key={id} className="container workoutlist-item">
            <div className="wrapper my-2 p-2 rounded-lg border-[#8ebbff] border-4 p-color">
              <p>Example Workout</p>
              <div className="flex justify-between">
                {moment(createdAt).format("dddd, MMM Do")}
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
