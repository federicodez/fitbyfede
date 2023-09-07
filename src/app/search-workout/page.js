import { SearchBar, Unauth } from "@/components";

export default function SearchWorkout() {
  return (
    <div>
      <Unauth>
        <SearchBar />
      </Unauth>
    </div>
  );
}
