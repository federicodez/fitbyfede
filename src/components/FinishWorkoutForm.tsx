"use client";
import { useRouter } from "next/navigation";
import { CustomButton } from ".";
import { Workout } from "@/types";
import { useSession } from "next-auth/react";
import { findUser, createWorkout, getMostRecentWorkout } from "@/utils";

export default function FinishWorkoutForm({ workout }: Workout) {
  const { id, exercise, lbs, reps } = workout;
  console.log({ id, exercise, lbs, reps });
  const router = useRouter();
  const { data: session } = useSession();

  // async () => {
  //   const {
  //     user: { name, email },
  //   } = session;
  //
  //   if (email) {
  //     try {
  //       const foundUser = await findUser(email);
  //       const { id } = foundUser;
  //       const recent = await getMostRecentWorkout(id);
  //       console.log({ recent });
  //
  //       if (id) {
  //         const createdWorkout = await createWorkout(id, exercise[0]);
  //         const { id } = createdWorkout;
  //         console.log({ createWorkout });
  //         router.push(`/editWorkout/${id}`);
  //       }
  //       router.push("/");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  const handleSubmit = async (data: FormData) => {
    const lbs = data.getAll("lbs")?.valueOf();
    const reps = data.getAll("reps")?.valueOf();

    if (!lbs || !reps) {
      alert("Exercise, lbs, sets, and reps are required");
      return;
    }

    // try {
    //   const res = await fetch(`http://localhost:3000/api/workouts/${_id}`, {
    //     method: "PUT",
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //     body: JSON.stringify({ lbs, reps }),
    //   });
    //
    //   if (res.ok) {
    //     router.refresh();
    //     router.push("/");
    //   } else {
    //     throw new Error("Failed to create a topic");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const addSet = async () => {
    // try {
    //   const res = await fetch(`http://localhost:3000/api/editWorkout/${_id}`, {
    //     method: "PUT",
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //     body: JSON.stringify({ lbs: 0, reps: 0 }),
    //   });
    //
    //   if (res.ok) {
    //     router.refresh();
    //   } else {
    //     throw new Error("Failed to create a topic");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const removeWorkout = async () => {
    const confirmed = confirm("Are you sure?");

    // if (confirmed) {
    //   const res = await fetch(`http://localhost:3000/api/workouts?id=${_id}`, {
    //     method: "DELETE",
    //   });
    //
    //   if (res.ok) {
    //     router.push("/");
    //   }
    // }
  };

  return (
    <div className="wrapper container">
      <form action={handleSubmit} className="finish-workout-form">
        <h1 className="finish-workout-form__title">{exercise}</h1>
        <ul className="finish-workout-form__list">
          {lbs?.map((lb, id) => (
            <li key={id} className="finish-workout-form__item">
              <div className="finish-workout-form__set">
                <label>Set</label>
                <div className="finish-workout-form__set-id">{(id += 1)}</div>
              </div>
              <div>
                <label htmlFor="lbs">Weight (lbs): </label>
                <input
                  type="number"
                  name="lbs"
                  id="lbs"
                  className="finish-workout-form__input"
                />
              </div>
              <div>
                <label htmlFor="reps">Reps: </label>
                <input
                  type="number"
                  name="reps"
                  id="reps"
                  className="finish-workout-form__input"
                />
              </div>
            </li>
          ))}
        </ul>
        <div className="finish-workout-form__btn-container">
          <CustomButton
            title="Add Set"
            containerStyles="finish-workout-form__custom-btn"
            handleClick={addSet}
          />
          <button type="submit" className="finish-workout-form__btn">
            Create Workout
          </button>
          <CustomButton
            title="Cancel Workout"
            containerStyles="finish-workout-form__cancel-btn"
            handleClick={removeWorkout}
          />
        </div>
      </form>
    </div>
  );
}
