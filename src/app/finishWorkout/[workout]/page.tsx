"use client";
import { FinishWorkoutForm } from "@/components/";
import { getMostRecentWorkout, findUser } from "@/utils";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Workout } from "@/types";

export default function FinishWorkout({
  params,
}: {
  params: { workout: Workout };
}) {
  const { workout } = params;
  console.log({ workout });
  // const { data: session } = useSession();
  //
  // async () => {
  //   const {
  //     user: { name, email },
  //   } = session;
  //
  //   if (email) {
  //     try {
  //       const foundUser = await findUser(email);
  //       const { id } = foundUser;
  //       const workout = await getMostRecentWorkout(id);
  //       console.log({ workout });
  //       setWorkout((prev) => ({
  //         ...prev,
  //         id: workout?.id,
  //         exercise: workout?.exercise,
  //         lbs: workout?.lbs,
  //         reps: workout?.reps,
  //         userId: id,
  //       }));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  return (
    <div>
      <FinishWorkoutForm workout={workout} />
    </div>
  );
}
