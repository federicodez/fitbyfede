"use client";

import { useRouter } from "next/navigation";
import { Workout } from "@/types";
import { CustomButton } from "@/components";
import { updateWorkout } from "@/actions";

type EditWorkoutFormProps = {
  workout: Workout;
};

const EditWorkoutForm = ({ workout }: EditWorkoutFormProps) => {
  const { id, exercise, lbs, reps } = workout;
  const router = useRouter();

  const handleSubmit = async (data: FormData) => {
    const dataLbs = data.getAll("lbs")?.valueOf();
    const newLbs = Object.values(dataLbs).map((lb) => {
      lbs?.push(Number(lb));
      lbs?.shift();
    });
    const dataReps = data.getAll("reps")?.valueOf();
    const newReps = Object.values(dataReps).map((rep) => {
      reps?.push(Number(rep));
      reps?.shift();
    });

    try {
      await updateWorkout(id, lbs, reps);
      router.push(`/workouts`);
    } catch (error) {
      console.log(error);
    }
  };

  const addSet = async () => {
    try {
      lbs?.push(0);
      reps?.push(0);
      await updateWorkout(id, lbs, reps);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="wrapper container">
      <form action={handleSubmit} className="edit-workout-form">
        <h1 className="edit-workout-form__title">{exercise}</h1>
        <div className="edit-workout-form__container">
          <ul className="edit-workout-form__list" id="lbs-list">
            {lbs?.map((lb, id) => (
              <li key={id} className="edit-workout-form__item">
                <div className="edit-workout-form__set">
                  <label>Set</label>
                  <div className="edit-workout-form__set-id">{(id += 1)}</div>
                </div>
                <div className="edit-workout-form__lbs">
                  <label htmlFor="lbs">Weight (lbs): </label>
                  <input
                    type="string"
                    name="lbs"
                    defaultValue={`${lb ? lb : 0}`}
                    placeholder={`${lb}`}
                    className="edit-workout-form__input"
                  />
                </div>
              </li>
            ))}
          </ul>
          <ul className="edit-workout-form__list">
            {reps?.map((rep, id) => (
              <li key={id}>
                <label htmlFor="reps">Reps: </label>
                <input
                  type="string"
                  name="reps"
                  defaultValue={`${rep ? rep : 0}`}
                  placeholder={`${rep}`}
                  className="edit-workout-form__input"
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="edit-workout-form__btn">
          <CustomButton
            title="Add Set"
            handleClick={addSet}
            containerStyles="edit-workout-form__add-btn"
          />
          <button type="submit" className="edit-workout-form__submit-btn">
            Update Workout
          </button>
          <CustomButton
            title="Cancel Update"
            handleClick={() => {
              router.push("/");
            }}
            containerStyles="edit-workout-form__cancel-btn"
          />
        </div>
      </form>
    </div>
  );
};

export default EditWorkoutForm;
