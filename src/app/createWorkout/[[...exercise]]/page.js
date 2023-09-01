import { FinishWorkoutForm } from "@/components/";
import CreateWorkoutForm from "@/components/CreateWorkoutForm";

export default async function CreateWorkout({ params }) {
  const exercise = params.exercise[0].replaceAll("%20", " ");

  return !exercise ? (
    <div>
      <CreateWorkoutForm />
    </div>
  ) : (
    <FinishWorkoutForm exercise={exercise} />
  );
}
