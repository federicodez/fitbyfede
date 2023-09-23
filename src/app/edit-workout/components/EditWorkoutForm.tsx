"use client";

import { useRouter } from "next/navigation";
import { type Workout } from "@/types";
import { CustomButton } from "@/components";
import { updateWorkout } from "@/actions";

type EditWorkoutFormProps = {
  workout: Workout;
};

const EditWorkoutForm = ({ workout }: EditWorkoutFormProps) => {
  const { id, exercise, sets, lbs, reps } = workout;
  const router = useRouter();

  const handleSubmit = async (data: FormData) => {
    const dataSets = data.getAll("sets")?.valueOf();
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
      await updateWorkout(id, sets, lbs, reps);
      router.push(`/workouts`);
    } catch (error) {
      console.log(error);
    }
  };

  const addSet = async () => {
    try {
      const set = `${(sets[sets.length - 1] += 1)}`;
      console.log({ set });
      sets?.push(`${(sets[sets.length - 1] += 1)}`);
      lbs?.push(0);
      reps?.push(0);
      await updateWorkout(id, sets, lbs, reps);
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
          <ul className="edit-workout-form__list" id="sets-list">
            {sets?.map((set, id) => (
              <li key={id} className="edit-workout-form__item">
                <div className="edit-workout-form__label-input">
                  <label htmlFor="set">Set</label>
                  <input
                    type="string"
                    name="set"
                    defaultValue={`${set}`}
                    className="edit-workout-form__input"
                  />
                </div>
              </li>
            ))}
          </ul>
          <ul className="edit-workout-form__list" id="lbs-list">
            {lbs?.map((lb, id) => (
              <li key={id} className="edit-workout-form__item">
                <div className="edit-workout-form__label-input">
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
              <li key={id} className="edit-workout-form__item">
                <div className="edit-workout-form__label-input">
                  <label htmlFor="reps">Reps: </label>
                  <input
                    type="string"
                    name="reps"
                    defaultValue={`${rep ? rep : 0}`}
                    placeholder={`${rep}`}
                    className="edit-workout-form__input"
                  />
                </div>
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
