import { Workout } from "@/types";
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
