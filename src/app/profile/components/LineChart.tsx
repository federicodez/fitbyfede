import { type Workout } from "@/types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
);

type LineChartProps = {
  workouts: Workout[];
};

const LineChart = async ({ workouts }: LineChartProps) => {
  const data = {
    labels: workouts.map(({ createdAt }) =>
      moment(createdAt).format("dddd, MMM Do"),
    ),
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
      title: {
        display: true,
        text: "Workout Streak",
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

  return <Line className="bar-chart" data={data} options={options} />;
};

export default LineChart;
