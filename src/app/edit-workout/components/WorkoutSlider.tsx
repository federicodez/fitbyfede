"use client";

import { useState, MouseEvent } from "react";
import { CustomButton, SetOptions } from "@/components";
import { WorkoutSession, Workout } from "@/types";
import { useRouter } from "next/navigation";
import { changeWorkoutSet, deleteSet } from "@/actions";
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
}: WorkoutSliderProps) => {
  const [setOptions, setSetOptions] = useState<string | null>(null);
  const [setIndex, setSetIndex] = useState<number>(0);
  const router = useRouter();

  const changeSet = async (id: string, e: MouseEvent) => {
    const { target } = e;
    if (target) {
      const set = (target as HTMLButtonElement).value;
      const updated = await changeWorkoutSet(id, session, setIndex, set);
      if (updated) {
        setSession(updated);
        router.refresh();
      }
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
    <ul className="flex flex-col gap-4">
      {sets?.map((set, setId) => (
        <div key={setId}>
          <SetOptions
            id={id}
            setId={setId}
            setIndex={setIndex}
            setOptions={setOptions}
            setSetOptions={setSetOptions}
            changeSet={changeSet}
          />
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={(swiper) => handleDeleteSet(id, setId, swiper)}
          >
            <SwiperSlide>
              <li className="flex flex-row justify-evenly py-2">
                <div className="relative h-full">
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
                  <div className="border-4 rounded-lg w-20 h-fit my-2 border-gray-300"></div>
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
                    className="bg-gray-300 rounded-lg w-20"
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
                    className="bg-gray-300 rounded-lg w-20"
                  />
                </div>
              </li>
            </SwiperSlide>
            <SwiperSlide>
              <button
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
