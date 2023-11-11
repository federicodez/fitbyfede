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
  previous: Workout[] | [];
};

const WorkoutSlider = ({
  id,
  index,
  sets,
  lbs,
  reps,
  session,
  previous,
}: WorkoutSliderProps) => {
  const [setOptions, setSetOptions] = useState<string | null>(null);
  const [setIndex, setSetIndex] = useState<number>(0);
  const router = useRouter();

  const changeSet = async (id: string, e: MouseEvent) => {
    const workout = session.Workout.filter((workout) => workout.id === id);
    const { sets } = workout[0];
    const { target } = e;
    if (target) {
      const set = (target as HTMLButtonElement).value;
      sets.splice(setIndex, 1, set);
      const newSet: string[] = [];
      let i = 1;
      sets.map((set) => {
        if (!!Number(set)) {
          newSet.push(String(i));
          i++;
        } else {
          newSet.push(set);
        }
      });

      await changeWorkoutSet(id, newSet);
      router.refresh();
    }
  };

  const handleDeleteSet = async (id: string, setId: number, swiper: any) => {
    try {
      const workout = session.Workout.filter((workout) => workout.id === id);
      const { sets, lbs, reps } = workout[0];
      sets.splice(setId, 1);
      lbs.splice(setId, 1);
      reps.splice(setId, 1);
      if (!sets.length) {
        sets.push("1");
        lbs.push(0);
        reps.push(0);
      }
      await deleteSet(id, sets, lbs, reps);
      swiper.slideTo(0);
      router.refresh();
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
                    required
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
