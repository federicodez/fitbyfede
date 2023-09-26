"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Workout } from "@prisma/client";
import { Button, CustomButton, WorkoutForm } from "@/components";
import LoadingModel from "@/components/models/LoadingModel";

type WorkoutListProps = {
  workouts: Workout[];
};

const WorkoutList = ({ workouts }: WorkoutListProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  return (
    <>
      {isLoading && <LoadingModel />}
      <div className="wrapper container">
        {workouts.map((workout, id) => (
          <div key={id}>
            <WorkoutForm workout={workout} />
          </div>
        ))}
        <div className="workout-form__btn">
          <Button disabled={isLoading} fullWidth type="submit">
            Create Workout
          </Button>
          <CustomButton
            title="Cancel"
            handleClick={() => {
              router.push("/workouts");
            }}
            containerStyles="workout-form__cancel-btn"
          />
        </div>
      </div>
    </>
  );
};

export default WorkoutList;
