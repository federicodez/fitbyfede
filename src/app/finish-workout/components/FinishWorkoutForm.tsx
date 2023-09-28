"use client";

import { useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import { CustomButton } from "@/components";
import { Workout } from "@prisma/client";
import SetForm from "./SetForm";
import WeightForm from "./WeightForm";
import RepForm from "./RepForm";
import {
  changeWorkoutSet,
  deleteSession,
  deleteSet,
  deleteWorkout,
  updateWorkout,
} from "@/actions";
import LoadingModel from "@/components/models/LoadingModel";
import { HiOutlineTrash } from "react-icons/hi2";

type FinishWorkoutFormProps = {
  sessionId: string;
  items: Workout[];
};

const FinishWorkoutForm = ({ sessionId, items }: FinishWorkoutFormProps) => {
  const [workouts, setWorkouts] = useState(items);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
      {workouts?.map(({ id, exercise, sets, lbs, reps }) => (
        <div key={id}>
          <h1 className="workout-form__title">{exercise}</h1>
          <div className="workout-form__container">
            <SetForm
              id={id}
              sets={sets}
              changeSet={changeSet}
              handleDeleteSet={handleDeleteSet}
            />
            <WeightForm workouts={workouts} id={id} lbs={lbs} />
            <RepForm workouts={workouts} id={id} reps={reps} />
          </div>
          <div className="workout-form__btn">
            <CustomButton
              title="Add Set"
              containerStyles="workout-form__add-btn"
              handleClick={() => addSet(id)}
            />
          </div>
        </div>
      ))}

      <div className="workout-form__btn">
        <CustomButton
          title="Cancel Workout"
          containerStyles="workout-form__cancel-btn"
          handleClick={removeWorkout}
        />
      </div>
    </div>
  );
};

export default FinishWorkoutForm;
