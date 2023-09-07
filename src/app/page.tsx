import { WorkoutList, Unauth } from "@/components";

export default function Home() {
  return (
    <main className="wrapper container">
      <Unauth>
        <WorkoutList />
      </Unauth>
    </main>
  );
}
