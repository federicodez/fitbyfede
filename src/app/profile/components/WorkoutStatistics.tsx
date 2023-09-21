"use client";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { type Workout } from "@/types";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
);

type StatisticsProps = {
  workouts: Workout[];
};

const Statistics = ({ workouts }: StatisticsProps) => {
  const data = {
    labels: workouts.map((workout) => workout.exercise),
    datasets: [
      {
        data: workouts.map((workout) => workout.lbs[0]),
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0,
        borderWidth: 2,
        borderColor: "rgba(47, 97, 68, 1)",
        fill: "start",
        backgroundColor: "rgba(47, 97, 68, 0.3)",
      },
      point: {
        radius: 0,
        hitRadius: 0,
      },
    },
    scales: {
      xAxis: {
        display: false,
      },
      yAxis: {
        display: false,
      },
    },
  };
  return (
    <div className="statistics-card">
      <h1 className="statistics-title">Statistics</h1>
      <Line data={data} width={200} height={200} options={options} />
    </div>
  );
};

export default Statistics;
