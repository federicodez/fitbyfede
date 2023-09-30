"use client";

import { useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { CustomButton } from "@/components";
import { Workout } from "@prisma/client";
import { Control, useForm, FormProvider, useFieldArray } from "react-hook-form";
import SetForm from "./SetForm";
import WeightForm from "./WeightForm";
import RepForm from "./RepForm";
import {
  changeWorkoutSet,
  deleteSession,
  deleteSet,
  updateWorkout,
} from "@/actions";
import LoadingModel from "@/components/models/LoadingModel";

type FinishWorkoutFormProps = {
  sessionId: string;
  items: Workout[];
};

type FormValues = {
  workout: {
    lb: number;
    rep: number;
  }[];
};

const defaultValues = {
  workout: [{ lb: 0, rep: 0 }],
};

const FinishWorkoutForm = ({ sessionId, items }: FinishWorkoutFormProps) => {
  const [workouts, setWorkouts] = useState(items);
  const [weights, setWeights] = useState([{ id: "", lb: "" }]);
  const [repititions, setRepititions] = useState<number[]>([]);
  const [setIndex, setSetIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const methods = useForm<FormValues>({ defaultValues });
  const {
    control,
    formState: { errors },
  } = useForm({ defaultValues });
  const { fields, append } = useFieldArray({ name: "workout", control });

  // const onSubmit = async (data) => {
  // const dataLbs = Object.values(data.getAll("lbs")?.valueOf());
  // setWeights({ ...dataLbs });
  // console.log({ weights });
  // console.log(workouts);
  // };

  const addSet = async (id: string) => {
    const workout = workouts.filter((workout) =>
      workout.id === id ? workout : null,
    );

    const { sets, lbs, reps } = workout[0];
    try {
      const lastSet = sets[sets.length - 1];
      if (!!Number(lastSet)) {
        const set = Number(lastSet) + 1;
        sets?.push(String(set));
      } else {
        sets?.push("1");
      }

      lbs?.push(0);
      reps?.push(0);
      await updateWorkout(id, sets, lbs, reps);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const changeSet = async (id: string, e: MouseEvent) => {
    const workout = workouts.filter((workout) =>
      workout.id === id ? workout : null,
    );
    const { sets } = workout[0];
    const { target } = e;
    if (target) {
      const set = (target as HTMLButtonElement).value;
      sets.splice(setIndex, 1, set);
      const newSet: string[] = [];
      let i = 1;
      sets.map((set) => {
        if (!!Number(set)) {
          newSet.push(String(i));
          i++;
        } else {
          newSet.push(set);
        }
      });

      await changeWorkoutSet(id, newSet);
      router.refresh();
    }
  };

  const handleDeleteSet = async (id: string, setId: number) => {
    const workout = workouts.filter((workout) =>
      workout.id === id ? workout : null,
    );
    const { sets, lbs, reps } = workout[0];
    sets.splice(setId, 1);
    lbs.splice(setId, 1);
    reps.splice(setId, 1);
    if (!sets.length) {
      sets.push("1");
      lbs.push(0);
      reps.push(0);
    }
    try {
      await deleteSet(id, sets, lbs, reps);
      router.refresh();
    } catch (err: any) {
      console.log(err);
    }
  };

  const removeWorkout = async () => {
    await deleteSession(sessionId);
    setIsLoading(true);
    router.push("/workouts");
  };

  return (
    <div className="wrapper container">
      {isLoading && <LoadingModel />}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => console.log(data))}>
          <ul className="workout-form__list">
            {workouts?.map(({ id, exercise, sets }) => (
              <li key={id} className="workout-form__item">
                <h1 className="workout-form__title">{exercise}</h1>
                <div className="workout-form__container">
                  <div className="workout-form__label-input grid grid-cols-3 gap-4">
                    <SetForm
                      {...methods}
                      id={id}
                      sets={sets}
                      setIndex={setIndex}
                      setSetIndex={setSetIndex}
                      changeSet={changeSet}
                      handleDeleteSet={handleDeleteSet}
                    />
                    <WeightForm {...methods} id={id} />
                    <RepForm {...methods} id={id} />
                  </div>
                </div>
                <div className="workout-form__btn">
                  <button
                    type="button"
                    className="workout-form__add-btn"
                    onClick={() => append({ lb: 0, rep: 0 })}
                  >
                    Add Set
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="workout-form__btn">
            <button type="submit" className="workout-form__submit-btn">
              Create Workout
            </button>
            <CustomButton
              title="Cancel Workout"
              containerStyles="workout-form__cancel-btn"
              handleClick={removeWorkout}
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default FinishWorkoutForm;
