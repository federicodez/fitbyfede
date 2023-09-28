import { Workout } from "@prisma/client";
import { updateWorkoutWeight } from "@/actions";

type WeightFormProps = {
  workouts: Workout[];
  id: string;
  lbs: number[];
};

const WeightForm = ({ workouts, id, lbs }: WeightFormProps) => {
  const handleSubmit = async (data: FormData) => {
    const datalbs = data.getAll("lbs")?.valueOf();
    const lbs = Object.values(datalbs).map((lb) => Number(lb));
    try {
      await updateWorkoutWeight(id, lbs);
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <form action={handleSubmit}>
      <ul className="workout-form__list">
        {lbs?.map((lb, lbId) => (
          <li key={lbId} className="workout-form__item">
            <div className="workout-form__label-input">
              <label htmlFor="lbs">Weight (lbs): </label>
              <input
                type="number"
                name="lbs"
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

export default WeightForm;
