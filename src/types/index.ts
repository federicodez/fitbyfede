import { MouseEventHandler } from "react";

export type CustomButtonProps = {
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
};

export type SearchExerciseProps = {
  exercise: string;
  setExercise: (exercise: string) => void;
};

export type Workout = {
  id: string;
  exercise: string;
  lbs: number[];
  reps: number[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Exercises = {
  exercises: [string, string];
};
