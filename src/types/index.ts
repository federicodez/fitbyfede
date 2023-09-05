import { ObjectId } from "mongodb";
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
  _id: ObjectId;
  id?: string;
  exercise: string;
  lbs?: [number];
  reps?: [number];
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Exercises = {
  exercises: [string, string];
};
