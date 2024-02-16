"use client";

import { useState } from "react";
import { WorkoutSession, Workout } from "@/types";
import { useRouter } from "next/navigation";
import { changeWorkoutSet, deleteSet } from "@/actions/workouts";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import { SetOptions } from ".";

type WorkoutSliderProps = {
  workoutId: string;
  index: number;
  sets: string[];
  lbs: number[];
  reps: number[];
  session: WorkoutSession;
  setSession: React.Dispatch<React.SetStateAction<WorkoutSession>>;
  setOptions: string | null;
  setSetOptions: React.Dispatch<React.SetStateAction<string | null>>;
  previous: Workout[] | [];
  bodyPart: string;
};

const WorkoutSlider = ({
  workoutId,
  index,
  sets,
  lbs,
  reps,
  session,
  setSession,
  previous,
  bodyPart,
  setOptions,
  setSetOptions,
}: WorkoutSliderProps) => {
  const [setIndex, setSetIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const changeSet = async (id: string, option: string) => {
    const updated = await changeWorkoutSet(id, session, setIndex, option);
    if (updated) {
      setSession(updated);
      router.refresh();
    }
  };

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
    <ul className="flex flex-col">
      <div className="flex justify-evenly mx-8 md:mx-20">
        <span className="flex justify-center items-center w-full md:pl-6">
          Set
        </span>
        <span className="flex justify-center items-center w-full">
          Previous
        </span>
        {bodyPart === "cardio" ? (
          <span className="flex justify-center items-center w-full">mile</span>
        ) : (
          <span className="flex justify-center items-center w-full">lbs</span>
        )}
        {bodyPart === "cardio" ? (
          <span className="flex justify-center items-center w-full">Time</span>
        ) : (
          <span className="flex justify-center items-center w-full md:pr-7">
            Reps
          </span>
        )}
      </div>
      {sets?.map((set, setIdx) => (
        <div key={setIdx} className="relative modal-root">
          {isModalOpen && (
            <SetOptions
              workoutId={workoutId}
              setIdx={setIdx}
              setIndex={setIndex}
              setOptions={setOptions}
              setSetOptions={setSetOptions}
              changeSet={changeSet}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          )}
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={(swiper) =>
              handleDeleteSet(workoutId, setIdx, swiper)
            }
          >
            <SwiperSlide>
              <li className="flex flex-row justify-evenly py-4">
                <button
                  type="button"
                  className="bg-gray-300 text-black rounded-lg w-10 md:w-20 pl-[0.5]"
                  onClick={() => {
                    setIsModalOpen(true);
                    setSetOptions(workoutId);
                    setSetIndex(setIdx);
                  }}
                >
                  {set}
                </button>
                {previous?.[index]?.lbs[setIdx] ? (
                  <div className="bg-gray-300 text-black rounded-lg w-fit px-2">{`${previous[index].lbs[setIdx]} x ${previous[index].reps[setIdx]}`}</div>
                ) : (
                  <div className="rounded-lg w-12 md:w-20 h-7 bg-gray-300"></div>
                )}
                <div className="">
                  <input
                    tabIndex={0}
                    type="number"
                    pattern="[0-9]*"
                    inputMode="decimal"
                    name="lbs"
                    id="lbs"
                    defaultValue={`${lbs[setIdx] ? lbs[setIdx] : ""}`}
                    placeholder={`${
                      previous?.[index]?.lbs[setIdx]
                        ? previous?.[index]?.lbs[setIdx]
                        : ""
                    }`}
                    className="pl-2 bg-gray-300 text-black rounded-lg w-14 md:w-20"
                  />
                </div>
                <div className="">
                  <input
                    type="number"
                    pattern="[0-9]*"
                    inputMode="decimal"
                    name="reps"
                    id="reps"
                    defaultValue={`${reps[setIdx] ? reps[setIdx] : ""}`}
                    placeholder={`${
                      previous?.[index]?.reps[setIdx]
                        ? previous?.[index]?.reps[setIdx]
                        : ""
                    }`}
                    className="pl-4 bg-gray-300 text-black rounded-lg w-14 md:w-20"
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
