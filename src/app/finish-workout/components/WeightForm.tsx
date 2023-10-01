import { Workout } from "@prisma/client";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";

type WeightFormProps = {
  workoutIndex: number;
};

const WeightForm = ({ workoutIndex }: WeightFormProps) => {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: `workouts.${workoutIndex}.lbs`,
    control,
  });

  fields.map((field) => console.log(field));
  return (
    <ul className="workout-form__list">
      {fields?.map((field, index) => (
        <li key={field.id} className="workout-form__item">
          <div className="workout-form__label-input">
            <label htmlFor="lbs">Weight (lbs): </label>
            <input
              type="number"
              placeholder="0"
              {...register(`workouts.${workoutIndex}.lbs.${index}` as const, {
                valueAsNumber: true,
              })}
              name="lbs"
              className="workout-form__input"
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default WeightForm;
