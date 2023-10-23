"use client";

import React, { useState, useEffect, createContext, useContext } from "react";

type TimerContextProviderProps = {
  children: React.ReactNode;
};

type TimerContext = {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
};

export const TimerContext = createContext<TimerContext | null>(null);

export default function TimerContextProvider({
  children,
}: TimerContextProviderProps) {
  const [time, setTime] = useState(0);

  return (
    <TimerContext.Provider value={{ time, setTime }}>
      {children}
    </TimerContext.Provider>
  );
}

export function useTimerContext() {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error(
      "useTimerContext must be used within a TimerContextProvider",
    );
  }
  return context;
}
