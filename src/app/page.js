import { WorkoutList, Unauth } from "@/components";

export default async function Home() {
  return (
    <main className="wrapper container">
      <WorkoutList />
    </main>
  );
}
