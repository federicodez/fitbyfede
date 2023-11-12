"use client";

import React, { useState } from "react";
import { bodyParts, categories } from "@/constants";
import { Workout, Data } from "@/types";
import { AiOutlineCheck } from "react-icons/ai";
import { WorkoutSession } from "@prisma/client";
import data from "@/constants/exerciseData.json";

type BodyPartSelectionProps = {
  data: Data;
  bodyPartBtn: string;
  recentWorkouts: Workout[];
  categoriesBtn: string;
  showParts: boolean;
  setWorkouts: React.Dispatch<React.SetStateAction<Data>>;
  setRecent: React.Dispatch<React.SetStateAction<Workout[]>>;
  setBodyPartBtn: React.Dispatch<React.SetStateAction<string>>;
  setShowParts: React.Dispatch<React.SetStateAction<boolean>>;
};

const BodyPartSelection = ({
  data,
  bodyPartBtn,
  recentWorkouts,
  categoriesBtn,
  showParts,
  setRecent,
  setWorkouts,
  setBodyPartBtn,
  setShowParts,
}: BodyPartSelectionProps) => {
  const handleParts = async (query: string) => {
    let filtered;
    try {
      if (query === "any" && categoriesBtn === "Any Category") {
        setBodyPartBtn("Any Body Part");
        setWorkouts(data);
      } else if (query === "any" && categoriesBtn !== "Any Category") {
        setBodyPartBtn("Any Body Part");
        const categories = data.filter(
          ({ equipment }) => equipment === categoriesBtn,
        );
        setWorkouts(categories);
      } else if (categoriesBtn !== "Any Category") {
        const filtered: Data = [];
        data.filter((item) => {
          if (item.bodyPart === query && item.equipment === categoriesBtn) {
            filtered.push(item);
          }
        });
        setWorkouts(filtered);
        setBodyPartBtn(query);
        const recentParts = recentWorkouts.filter(
          ({ bodyPart }) => bodyPart === query,
        );
        setRecent(recentParts);
      } else {
        filtered = data.filter(({ bodyPart }) => bodyPart === query);
        setWorkouts(filtered);
        setBodyPartBtn(query);
        const recentParts = recentWorkouts.filter(
          ({ bodyPart }) => bodyPart === query,
        );
        setRecent(recentParts);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative w-full">
      <ul
        onMouseLeave={() => setShowParts(false)}
        className="absolute w-full z-10 bg-gray-800 text-white rounded-lg left-0"
      >
        {showParts
          ? bodyParts.map((part, idx) => (
              <li
                key={idx}
                className={`flex flex-row cursor-pointer p-2 ${
                  bodyPartBtn === part ? "bg-gray-500" : ""
                }`}
              >
                <div
                  onClick={() => {
                    handleParts(part);
                    setShowParts(false);
                  }}
                  className={`flex flex-col w-full`}
                  id={part}
                >
                  {part}
                </div>
                {bodyPartBtn === part ? <AiOutlineCheck /> : null}
              </li>
            ))
          : null}
      </ul>
      <button
        onClick={() => {
          setShowParts(true);
        }}
        className={`w-full rounded-lg px-5 text-black ${
          bodyPartBtn !== "Any Body Part" ? "bg-blue-300" : "bg-gray-50"
        }`}
      >
        {bodyPartBtn}
      </button>
    </div>
  );
};

export default BodyPartSelection;
