import { getCurrentUser } from "@/actions";
import { SearchBar } from "@/components";

const SearchWorkout = async () => {
  const currentUser = await getCurrentUser();

  return <SearchBar currentUser={currentUser!} />;
};

export default SearchWorkout;
