import { bodyParts, categories } from "@/constants";
import { Workout, Data, WorkoutSession } from "@/types";
import { AiOutlineCheck } from "react-icons/ai";

type CategorySelectionProps = {
  bodyPartBtn: string;
  categoriesBtn: string;
  showCategories: boolean;
  setShowCategories: React.Dispatch<React.SetStateAction<boolean>>;
  setCategoriesBtn: React.Dispatch<React.SetStateAction<string>>;
};

const CategorySelection = ({
  bodyPartBtn,
  categoriesBtn,
  showCategories,
  setShowCategories,
  setCategoriesBtn,
}: CategorySelectionProps) => {
  const handleCategories = async (query: string) => {
    try {
      if (query === "any" && bodyPartBtn === "Any Body Part") {
        setCategoriesBtn("Any Category");
      } else if (query === "any" && bodyPartBtn !== "Any Body Part") {
        setCategoriesBtn("Any Category");
      } else if (bodyPartBtn !== "Any Body Part") {
        setCategoriesBtn(query);
      } else {
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
