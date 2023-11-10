import { bodyParts, categories } from "@/constants";
import { Workout, Data, WorkoutSession } from "@/types";
import { AiOutlineCheck } from "react-icons/ai";

type CategorySelectionProps = {
  data: Data;
  bodyPartBtn: string;
  categoriesBtn: string;
  showCategories: boolean;
  setWorkouts: React.Dispatch<React.SetStateAction<Data>>;
  setSession?: React.Dispatch<React.SetStateAction<WorkoutSession>>;
  setShowCategories: React.Dispatch<React.SetStateAction<boolean>>;
  setCategoriesBtn: React.Dispatch<React.SetStateAction<string>>;
};

const CategorySelection = ({
  data,
  bodyPartBtn,
  categoriesBtn,
  showCategories,
  setWorkouts,
  setSession,
  setShowCategories,
  setCategoriesBtn,
}: CategorySelectionProps) => {
  const handleCategories = async (query: string) => {
    let categories;
    try {
      if (query === "any" && bodyPartBtn === "Any Body Part") {
        setCategoriesBtn("Any Category");
        setWorkouts(data);
      } else if (query === "any" && bodyPartBtn !== "Any Body Part") {
        setCategoriesBtn("Any Category");
        const filtered = data.filter(
          ({ bodyPart }) => bodyPart === bodyPartBtn,
        );
        setWorkouts(filtered);
      } else if (bodyPartBtn !== "Any Body Part") {
        const filtered: Data = [];
        data.filter((item) => {
          if (item.equipment === query && item.bodyPart === bodyPartBtn) {
            filtered.push(item);
          }
        });
        setWorkouts(filtered);
        setCategoriesBtn(query);
      } else {
        categories = data.filter(({ equipment }) => equipment === query);
        setWorkouts(categories);
        setCategoriesBtn(query);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative w-full">
      <ul
        onMouseLeave={() => setShowCategories(false)}
        className="absolute w-full z-10 bg-gray-800 text-white rounded-lg right-0"
      >
        {showCategories
          ? categories.map((category, idx) => (
              <li
                key={idx}
                className={`flex flex-row cursor-pointer p-2 ${
                  categoriesBtn === category ? "bg-gray-500" : ""
                }`}
              >
                <div
                  onClick={() => {
                    handleCategories(category);
                    setShowCategories(false);
                  }}
                  className={`flex flex-col w-full`}
                  id={category}
                >
                  {category}
                </div>
                {categoriesBtn === category ? <AiOutlineCheck /> : null}
              </li>
            ))
          : null}
      </ul>
      <button
        onClick={() => {
          setShowCategories(true);
        }}
        className={`w-full rounded-lg px-5 text-black ${
          categoriesBtn !== "Any Category" ? "bg-blue-300" : "bg-gray-50"
        }`}
      >
        {categoriesBtn}
      </button>
    </div>
  );
};

export default CategorySelection;
