"use client";

import { type Workout } from "@/types";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

type StatisticsProps = {
  workouts: Workout[];
};

const Statistics = ({ workouts }: StatisticsProps) => {
  return (
    <div className="statistics-card">
      <PieChart workouts={workouts} />
    </div>
  );
};

export default Statistics;
