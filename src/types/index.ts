import { ObjectId } from "mongodb";
import { MouseEventHandler } from "react";

export interface CustomButtonProps {
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
}

export interface SearchExerciseProps {
  exercise: string;
  setExercise: (exercise: string) => void;
}

export interface WorkoutProps {
  _id: ObjectId;
  exercise: string;
  lbs: [number];
  reps: [number];
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}
