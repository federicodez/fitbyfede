import { useState, MouseEvent } from "react";
import { CustomButton } from "@/components";
import { HiOutlineTrash } from "react-icons/hi2";
import { useFieldArray, useFormContext } from "react-hook-form";

type SetFormProps = {
  workoutIndex: number;
};

const SetForm = ({ workoutIndex }: SetFormProps) => {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: `workouts.${workoutIndex}.sets`,
    control,
  });

  return (
    <ul className="workout-form__list" id="sets-list">
      {fields?.map((field, index) => (
        <li key={field.id} className="workout-form__item">
          <button type="button" onClick={() => {}}>
            <HiOutlineTrash />
          </button>
          <div className="workout-form__label-input">
            <span>Set</span>
            <input
              type="string"
              {...register(`workouts.${workoutIndex}.sets.${index}` as const)}
              className="workout-form__input"
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SetForm;
