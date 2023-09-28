import { Workout } from "@prisma/client";
import { updateWorkoutReps } from "@/actions";

type RepFormProps = {
  workouts: Workout[];
  id: string;
  reps: number[];
};

const RepForm = ({ workouts, id, reps }: RepFormProps) => {
  const handleSubmit = async (data: FormData) => {
    const datareps = data.getAll("reps")?.valueOf();
    const reps = Object.values(datareps).map((rep) => Number(rep));
    try {
      await updateWorkoutReps(id, reps);
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <form action={handleSubmit}>
      <ul className="workout-form__list">
        {reps?.map((rep, repId) => (
          <li key={repId} className="workout-form__item">
            <div className="workout-form__label-input">
              <label htmlFor="reps">Reps: </label>
              <input
                type="number"
                name="reps"
                defaultValue="0"
                className="workout-form__input"
                required
              />
            </div>
          </li>
        ))}
      </ul>

      <div className="workout-form__btn">
        <button type="submit" className="workout-form__submit-btn">
          Create Workout
        </button>
      </div>
    </form>
  );
};

export default RepForm;
