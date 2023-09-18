import { getCurrentUser } from "@/actions";
import { SearchBar } from "@/components";

const SearchWorkout = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div>
      <SearchBar currentUser={currentUser} />
    </div>
  );
};

export default SearchWorkout;
