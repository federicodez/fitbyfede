import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import moment from "moment";

const getWorkouts = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/workouts", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch workouts");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading workouts: ", error);
  }
};

export default async function WorkoutList() {
  const { workouts } = await getWorkouts();
  return (
    <section>
      <ul className="workouts">
        {workouts.map(({ exercise, lbs, reps, notes, createdAt, _id }) => (
          <li key={_id} className="container card">
            <div>{moment(createdAt).format("dddd, MMM Do")}</div>
            <div className="exercise">
              <strong>{exercise}</strong>
            </div>
            <div className="exercise-details">
              <div className="lbs">
                {lbs}
                <i> lbs </i> x {reps}
              </div>
              <p className="notes">Notes: {notes}</p>
            </div>
            <div className="btn">
              <RemoveBtn id={_id} />
              <Link href={`/editWorkout/${_id}`}>
                <HiPencilAlt />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
