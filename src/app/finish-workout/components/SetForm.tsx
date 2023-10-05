import { useState, MouseEvent } from "react";
import { CustomButton } from "@/components";
import { HiOutlineTrash } from "react-icons/hi2";
import { useFieldArray, useFormContext } from "react-hook-form";

type SetFormProps = {
  id: number;
  set: set;
};

const SetForm = ({ workoutIndex, workoutId }: SetFormProps) => {
  const { register, control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: `workouts`,
    control,
  });

  // fields.map((field) => console.log(field));
  return (
    <div className="workout-form__container">
      <ul className="workout-form__list" id="sets-list">
        {fields?.map((field, index) => (
          <div
            className="workout-form__label-input grid grid-cols-3 gap-4"
            key={field.id}
          >
            <li key={field.id} className="workout-form__item">
              <button type="button" onClick={() => remove(index)}>
                <HiOutlineTrash />
              </button>
              <div className="workout-form__label-input">
                <span>Set</span>
                <input
                  type="string"
                  {...register(
                    `workouts[${workoutIndex}].sets[${index}]` as const,
                  )}
                  className="workout-form__input"
                />
              </div>
            </li>
            <li>
              <div className="workout-form__label-input">
                <span>Weight (lbs)</span>
                <input
                  type="string"
                  {...register(
                    `workouts[${workoutIndex}].lbs[${index}]` as const,
                  )}
                  className="workout-form__input"
                />
              </div>
            </li>
            <li>
              <div className="workout-form__label-input">
                <span>Reps</span>
                <input
                  type="string"
                  {...register(
                    `workouts[${workoutIndex}].reps[${index}]` as const,
                  )}
                  className="workout-form__input"
                />
              </div>
            </li>
          </div>
        ))}
      </ul>
      <div className="workout-form__btn">
        <button
          type="button"
          onClick={() => append({ sets: ["0"], lbs: [0], reps: [0] })}
          className="workout-form__add-btn"
        >
          Add Set
        </button>
      </div>
    </div>
  );
};

export default SetForm;
