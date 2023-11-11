"use client";

import React, { useState } from "react";
import { bodyParts, categories } from "@/constants";
import { AiOutlineCheck } from "react-icons/ai";

type BodyPartSelectionProps = {
  bodyPartBtn: string;
  categoriesBtn: string;
  showParts: boolean;
  setBodyPartBtn: React.Dispatch<React.SetStateAction<string>>;
  setShowParts: React.Dispatch<React.SetStateAction<boolean>>;
};

const BodyPartSelection = ({
  bodyPartBtn,
  categoriesBtn,
  showParts,
  setBodyPartBtn,
  setShowParts,
}: BodyPartSelectionProps) => {
  const handleParts = async (query: string) => {
    try {
      if (query === "any" && categoriesBtn === "Any Category") {
        setBodyPartBtn("Any Body Part");
      } else if (query === "any" && categoriesBtn !== "Any Category") {
        setBodyPartBtn("Any Body Part");
      } else if (categoriesBtn !== "Any Category") {
        setBodyPartBtn(query);
      } else {
        setBodyPartBtn(query);
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
