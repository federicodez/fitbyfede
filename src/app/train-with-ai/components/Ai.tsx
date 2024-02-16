"use client";

import { CurrentUser, WorkoutSession } from "@/types";
import { fullBody } from "@/actions/workouts/fullbody";

type AiProps = {
  currentUser: CurrentUser;
  sessions: WorkoutSession[];
};

export default function Ai({ currentUser, sessions }: AiProps) {
  const getfullBody = async () => {
    // check which exercises user worked out previous and select a different exercise
    const prevWorkout = await fullBody();
  };

  const legDay = () => {};

  const pullDay = () => {};

  const pushDay = () => {};

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
      h-fit
      md:w-[850px] 
      md:top-1/2
      md:left-2/3
      md:-translate-x-3/4
      md:-translate-y-1/2
      shadow-[inset_0_-3em_3em_rgba(0,0,0,0.1),0.3em_0.3em_1em_rgba(0,0,0,0.3)]
    `}
    >
      <div className="grid grid-cols-2 gap-2">
        <div
          className="text-center border-2 rounded-md cursor-pointer hover:bg-blue-900 hover:text-white"
          onClick={getfullBody}
        >
          Train Full Body
        </div>
        <div
          className="text-center border-2 rounded-md cursor-pointer hover:bg-blue-900 hover:text-white"
          onClick={legDay}
        >
          Train Legs
        </div>
        <div
          className="text-center border-2 rounded-md cursor-pointer hover:bg-blue-900 hover:text-white"
          onClick={pullDay}
        >
          Train Pull
        </div>
        <div
          className="text-center border-2 rounded-md cursor-pointer hover:bg-blue-900 hover:text-white"
          onClick={pushDay}
        >
          Train Push
        </div>
      </div>
    </div>
  );
}
