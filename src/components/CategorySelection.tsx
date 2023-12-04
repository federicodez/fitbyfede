"use client";

import { useState, useEffect, useRef } from "react";
import { categories } from "@/constants";
import { Data, CustomData } from "@/types";
import { AiOutlineCheck } from "react-icons/ai";

type CategorySelectionProps = {
  data: CustomData | Data;
  bodyPartBtn: string;
  categoriesBtn: string;
  setWorkouts: React.Dispatch<React.SetStateAction<CustomData | Data>>;
  setCategoriesBtn: React.Dispatch<React.SetStateAction<string>>;
};

const CategorySelection = ({
  data,
  bodyPartBtn,
  categoriesBtn,
  setWorkouts,
  setCategoriesBtn,
}: CategorySelectionProps) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    if (!showCategories) return;
    const checkIfClickedOutside = (e: MouseEvent | TouchEvent) => {
      if (
        menuRef?.current &&
        !menuRef?.current?.contains(e.target as HTMLElement)
      ) {
        setShowCategories(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [menuRef, showCategories, setShowCategories]);

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
        const filtered: CustomData = [];
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
    <div ref={menuRef} className="relative w-full">
      {showCategories && (
        <ul className="absolute w-full h-96 z-10 bg-gray-800 text-white rounded-md right-0 overflow-auto">
          {categories.map((category, idx) => (
            <li
              key={idx}
              className={`flex flex-row cursor-pointer p-2 ${
                categoriesBtn === category ? "bg-gray-500" : ""
              }`}
            >
              <div
                role="button"
                onClick={() => {
                  handleCategories(category);
                  setShowCategories(!showCategories);
                }}
                className={`flex flex-col w-full`}
                id={category}
              >
                {category}
              </div>
              {categoriesBtn === category && <AiOutlineCheck role="none" />}
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={() => setShowCategories(true)}
        className={`w-full rounded-md py-1.5 px-5 text-black text-center ${
          categoriesBtn !== "Any Category" ? "bg-blue-300" : "bg-gray-50"
        }`}
      >
        {categoriesBtn}
      </button>
    </div>
  );
};

export default CategorySelection;
