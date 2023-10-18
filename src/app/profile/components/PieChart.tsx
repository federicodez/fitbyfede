"use client";
import { Workout } from "@/types";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type PieChartProps = {
  workouts: Workout[];
};

type Tally = {
  [key: string]: number;
};

const PieChart = ({ workouts }: PieChartProps) => {
  const tally = workouts.reduce((tally: Tally, curr: Workout) => {
    tally[curr.name] = (tally[curr.name] || 0) + 1;
    return tally;
  }, {} as Tally);
  const labelData = Object.keys(tally);
  const setData = Object.values(tally);
  const data = {
    labels: labelData,
    datasets: [
      {
        label: "Workout Ratio",
        data: setData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie className="chart" id="pie" data={data} />;
};

export default PieChart;
