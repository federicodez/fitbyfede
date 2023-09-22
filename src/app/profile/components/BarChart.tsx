import { type Workout } from "@/types";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
);

type BarChartProps = {
  workouts: Workout[];
};

const BarChart = async ({ workouts }: BarChartProps) => {
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
        position: "top" as const,
        title: {
          text: "Workout PR's",
          display: true,
        },
      },
    },
  };

  return <Bar className="bar-chart" data={data} options={options} />;
};

export default BarChart;
