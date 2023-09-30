import { Workout } from "@prisma/client";
import { useFieldArray, useFormContext } from "react-hook-form";

type RepFormProps = {
  id: string;
};

const RepForm = ({ id }: RepFormProps) => {
  const { register, control } = useFormContext();
  const { fields, append } = useFieldArray({ name: "workout", control });
  return (
    <ul className="workout-form__list">
      {fields?.map((field, index) => (
        <li key={field.id} className="workout-form__item">
          <div className="workout-form__label-input">
            <label htmlFor="reps">Reps: </label>
            <input
              type="number"
              {...register(`workout.${index}.rep`, { valueAsNumber: true })}
              className="workout-form__input"
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RepForm;
