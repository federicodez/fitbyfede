"use client";
import { useRouter } from "next/navigation";
import { Workout } from "@/types";
import { CustomButton } from ".";
import { updateWorkout } from "@/utils";

type EditWorkoutFormProps = {
  workout: Workout;
};

export default function EditWorkoutForm({ workout }: EditWorkoutFormProps) {
  const { id, exercise, lbs, reps } = workout;
  const router = useRouter();

  const handleSubmit = async (data: FormData) => {
    const dataLbs = data.getAll("lbs")?.valueOf();
    const newLbs = Object.values(dataLbs);
    newLbs?.map((lb) => {
      if (!lb.length) throw new Error("Invalid weight.");
      lbs?.push(Number(lb));
      lbs?.shift();
    });

    const dataReps = data.getAll("reps")?.valueOf();
    const newReps = Object.values(dataReps);
    newReps?.map((rep) => {
      if (!rep.length) throw new Error("Invalid rep.");
      reps?.push(Number(rep));
      reps?.shift();
    });

    const updated = await updateWorkout(id, lbs, reps);
    router.push("/");
  };

  const addSet = async () => {
    lbs?.push(0);
    reps?.push(0);
    const updated = await updateWorkout(id, lbs, reps);
    router.refresh();
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
                    defaultValue={0}
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
                  defaultValue={0}
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
}
