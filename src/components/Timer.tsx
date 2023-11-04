"use client";

import { useState, useEffect, useRef } from "react";
import { SlOptions } from "react-icons/sl";
import { useTimerContext } from "@/context/TimerContext";

const StartTimer = () => {
  const { time, setTime } = useTimerContext();
  const [isRunning, setIsRunning] = useState(true);
  const [timerOptions, setTimerOptions] = useState(false);
  const intervalId = useRef<
    number | string | ReturnType<typeof setTimeout> | null
  >(null);

  useEffect(() => {
    if (isRunning) {
      intervalId.current = setInterval(() => setTime(time + 1), 10);
    }

    return () => clearInterval(Number(intervalId.current));
  }, [isRunning, time, setTime]);

  const hours = Math.floor(time / 360000);

  const minutes = Math.floor((time % 360000) / 6000);

  const seconds = Math.floor((time % 6000) / 100);

  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setTime(0);
  };

  return (
    <div className="flex items-center flex-row gap-2">
      <p className="text-center">
        {hours ? `${hours}:` : ""}
        {minutes.toString().padStart(2)}:{seconds.toString().padStart(2, "0")}
      </p>
      <div
        className="flex justify-center"
        onClick={() => setTimerOptions(true)}
      >
        <SlOptions className="flex w-fit bg-gray-300 rounded-md px-1" />
        <div
          onMouseLeave={() => setTimerOptions(false)}
          className={
            timerOptions
              ? "absolute z-10 bg-gray-800 text-white rounded-md"
              : "hidden"
          }
        >
          <button
            className="m-2 px-2 py-4 cursor-pointer"
            onClick={startAndStop}
          >
            {isRunning ? "Stop" : "Start"}
          </button>
          <button className="m-2 px-2 py-4 cursor-pointer" onClick={reset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartTimer;
