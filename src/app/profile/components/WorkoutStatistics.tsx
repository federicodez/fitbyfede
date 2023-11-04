import { Workout } from "@/types";
import PieChart from "./PieChart";

type StatisticsProps = {
  workouts: Workout[];
};

const Statistics = ({ workouts }: StatisticsProps) => {
  return (
    <div className="statistics-card mb-20 md:mb-10">
      <PieChart workouts={workouts} />
    </div>
  );
};

export default Statistics;
