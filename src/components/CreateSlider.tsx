"use client";

import { ChangeEvent, useState } from "react";
import { HiX } from "react-icons/hi";
import { bodyParts, categories } from "@/constants";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import { addExercise } from "@/actions";
import { AiOutlineCheck } from "react-icons/ai";

type CreateSliderProps = {
  create: boolean;
  setCreate: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateSlider = ({ create, setCreate }: CreateSliderProps) => {
  const [exercise, setExercise] = useState("");
  const [showParts, setShowParts] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [partSelected, setPartSelected] = useState("Any Body Part");
  const [categorySelected, setCategorySelected] = useState("Any Category");

  const submitExercise = async () => {
    try {
      await addExercise(exercise, partSelected, categorySelected);
      setCreate(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (e: ChangeEvent) => {
    setExercise((e.target as HTMLInputElement).value);
  };

  return (
    <div
      className={`
      fixed 
      z-10
      p-3
      text-black
      top-1/2 
      left-1/2 
      -translate-y-1/2 
      -translate-x-1/2 
      rounded-lg 
      bg-[#8ebbff] 
      w-[450px] 
      h-50
      md:w-[850px] 
      md:top-1/2
      md:left-2/3
      md:-translate-x-3/4
      md:-translate-y-1/2
      shadow-[inset_0_-3em_3em_rgba(0,0,0,0.1),0.3em_0.3em_1em_rgba(0,0,0,0.3)]
    `}
    >
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <div className="flex flex-row justify-evenly">
            <button
              onClick={() => setCreate(false)}
              className="text-[#c1121f] px-4 py-0 rounded-md bg-[#2f3651]"
            >
              <HiX />
            </button>
            <h3 className="text-xl">Create New Exercise</h3>
            <button
              className="text-[#8ebbff] bg-[#2f3651] px-6 py-0 rounded-md"
              onClick={submitExercise}
            >
              Save
            </button>
          </div>
          <input
            onChange={(e) => handleInput(e)}
            type="text"
            name="exercise"
            placeholder="Add Name"
            className="w-full bg-white my-5 rounded-lg text-black"
          />

          <div className="grid grid-cols-2 h-full justify-center items-center gap-3 my-2">
            <div className="relative w-full h-40 overflow-auto">
              <button
                onClick={() => {
                  setShowParts(true);
                }}
                className={`w-full rounded-lg px-5 text-black ${
                  partSelected !== "Any Body Part"
                    ? "bg-blue-300"
                    : "bg-gray-50"
                }`}
              >
                {partSelected}
              </button>
            </div>

            <div className="relative w-full h-full overflow-auto">
              <button
                onClick={() => {
                  setShowCategories(true);
                }}
                className={`w-full rounded-lg px-5 text-black ${
                  categorySelected !== "Any Category"
                    ? "bg-blue-300"
                    : "bg-gray-50"
                }`}
              >
                {categorySelected}
              </button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <ul className="absolute w-full z-10 bg-gray-800 text-white rounded-lg left-0">
            {showParts
              ? bodyParts.map((part, idx) => (
                  <li
                    key={idx}
                    className={`flex flex-row cursor-pointer p-2 ${
                      partSelected === part ? "bg-gray-500" : ""
                    }`}
                  >
                    <div
                      onClick={() => {
                        setPartSelected(part);
                        setShowParts(false);
                      }}
                      className={`flex flex-col w-full`}
                      id={part}
                    >
                      {part}
                    </div>
                    {partSelected === part ? <AiOutlineCheck /> : null}
                  </li>
                ))
              : null}

            {showCategories
              ? categories.map((category, idx) => (
                  <li
                    key={idx}
                    className={`flex flex-row cursor-pointer p-2 ${
                      categorySelected === category ? "bg-gray-500" : ""
                    }`}
                  >
                    <div
                      onClick={() => {
                        setCategorySelected(category);
                        setShowCategories(false);
                      }}
                      className={`flex flex-col w-full`}
                      id={category}
                    >
                      {category}
                    </div>
                    {categorySelected === category ? <AiOutlineCheck /> : null}
                  </li>
                ))
              : null}
          </ul>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default CreateSlider;
