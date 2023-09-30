"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Workout } from "@prisma/client";
import { Button, CustomButton, WorkoutForm } from "@/components";
import FinishWorkoutForm from "./FinishWorkoutForm";

type WorkoutListProps = {
  workouts: Workout[];
};

const WorkoutList = ({ workouts }: WorkoutListProps) => {
  const router = useRouter();
  return (
    <>
      {workouts.map((workout, id) => (
        <div className="wrapper container" key={id}>
          <FinishWorkoutForm workout={workout} />
        </div>
      ))}
    </>
  );
};

export default WorkoutList;
