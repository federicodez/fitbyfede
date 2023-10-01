import { Workout } from "@prisma/client";
import { useFieldArray, useFormContext } from "react-hook-form";

type RepFormProps = {
  workoutIndex: number;
};

const RepForm = ({ workoutIndex }: RepFormProps) => {
  const { register, control } = useFormContext();
  const { fields } = useFieldArray({
    name: `workouts.${workoutIndex}.reps`,
    control,
  });
  return (
    <ul className="workout-form__list">
      {fields?.map((field, index) => (
        <li key={field.id} className="workout-form__item">
          <div className="workout-form__label-input">
            <label htmlFor="reps">Reps: </label>
            <input
              type="number"
              placeholder="0"
              {...register(`workouts.${workoutIndex}.reps.${index}` as const, {
                valueAsNumber: true,
              })}
              className="workout-form__input"
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RepForm;
