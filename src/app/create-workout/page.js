import { CreateWorkoutForm, Unauth } from "@/components";

export default async function CreateWorkout() {
  return (
    <div>
      <Unauth>
        <CreateWorkoutForm />
      </Unauth>
    </div>
  );
}
