import { Workout } from "@prisma/client";
import { useFieldArray, useFormContext } from "react-hook-form";

type WeightFormProps = {
  id: string;
};

const WeightForm = ({ id }: WeightFormProps) => {
  const { register, control } = useFormContext();
  const { fields, append } = useFieldArray({ name: "workout", control });
  return (
    <ul className="workout-form__list">
      {fields.map((field, index) => (
        <li key={field.id} className="workout-form__item">
          <div className="workout-form__label-input">
            <label htmlFor="lbs">Weight (lbs): </label>
            <input
              type="number"
              {...register(`workout.${index}.lb`, { valueAsNumber: true })}
              className="workout-form__input"
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default WeightForm;
