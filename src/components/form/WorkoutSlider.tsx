"use client";

import { useState, MouseEvent } from "react";
import { CustomButton, SetOptions } from "@/components";
import { WorkoutSession, Workout } from "@/types";
import { useRouter } from "next/navigation";
import { changeWorkoutSet, deleteSet } from "@/actions/workouts";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";

type WorkoutSliderProps = {
  id: string;
  index: number;
  sets: string[];
  lbs: number[];
  reps: number[];
  session: WorkoutSession;
  setSession: React.Dispatch<React.SetStateAction<WorkoutSession>>;
  previous: Workout[] | [];
  setOptions: string | null;
  setSetOptions: React.Dispatch<React.SetStateAction<string | null>>;
  setIndex: number;
  setSetIndex: React.Dispatch<React.SetStateAction<number>>;
};

const WorkoutSlider = ({
  id,
  index,
  sets,
  lbs,
  reps,
  session,
  setSession,
  previous,
  setOptions,
  setSetOptions,
  setIndex,
  setSetIndex,
}: WorkoutSliderProps) => {
  const router = useRouter();

  const handleDeleteSet = async (id: string, setId: number, swiper: any) => {
    try {
      const workout = session.Workout.filter((workout) => workout.id === id);
      const { sets, lbs, reps } = workout[0];
      const updated = await deleteSet(id, sets, lbs, reps, setId);
      if (updated) {
        setSession(updated);
        swiper.slideTo(0);
        router.refresh();
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <ul className="flex flex-col gap-4">
      {sets?.map((set, setId) => (
        <div key={setId}>
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={(swiper) => handleDeleteSet(id, setId, swiper)}
          >
            <SwiperSlide>
              <li className="flex flex-row justify-evenly py-2">
                <div className="relative">
                  <CustomButton
                    title={set}
                    containerStyles="bg-gray-300 text-black rounded-lg w-20 pl-[0.5]"
                    handleClick={() => {
                      setSetOptions(id);
                      setSetIndex(setId);
                    }}
                  />
                </div>
                {previous?.[index]?.lbs[setId] ? (
                  <div className="bg-gray-300 rounded-lg w-fit px-2">{`${previous[index].lbs[setId]} x ${previous[index].reps[setId]}`}</div>
                ) : (
                  <div className="rounded-lg w-20 bg-gray-300"></div>
                )}
                <div className="">
                  <input
                    type="number"
                    name="lbs"
                    id="lbs"
                    defaultValue={`${lbs[setId] ? lbs[setId] : ""}`}
                    placeholder={`${
                      previous?.[index]?.lbs[setId]
                        ? previous?.[index]?.lbs[setId]
                        : ""
                    }`}
                    className="bg-gray-300 text-black rounded-lg w-20"
                  />
                </div>
                <div className="">
                  <input
                    type="number"
                    name="reps"
                    id="reps"
                    defaultValue={`${reps[setId] ? reps[setId] : ""}`}
                    placeholder={`${
                      previous?.[index]?.reps[setId]
                        ? previous?.[index]?.reps[setId]
                        : ""
                    }`}
                    className="bg-gray-300 text-black rounded-lg w-20"
                  />
                </div>
              </li>
            </SwiperSlide>
            <SwiperSlide>
              <button
                tabIndex={-1}
                type="button"
                className={`w-full bg-red-300 text-red-800 rounded-lg px-2`}
              >
                Delete Set
              </button>
            </SwiperSlide>
          </Swiper>
        </div>
      ))}
    </ul>
  );
};

export default WorkoutSlider;
