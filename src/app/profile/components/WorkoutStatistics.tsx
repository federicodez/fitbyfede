"use client";
import { type Workout } from "@/types";

type StatisticsProps = {
  workouts: Workout[];
};

const Statistics = ({ workouts }: StatisticsProps) => {
  // const exerciseCount = workouts.reduce((acc, curr) => {
  //   acc[curr.exercise] = (acc[curr.exercise] || 0) + 1;
  //   return acc;
  // }, {});
  //
  // const maxed = workouts.reduce((acc, curr, idx) => {
  //   acc[curr.exercise] = Math.max(...curr.lbs);
  //   return acc;
  // }, {});
  // console.log("statistics: ", maxed);

  return (
    <div className="profile-card">
      <h1 className="profile-title">Statistics</h1>
    </div>
  );
};

export default Statistics;
