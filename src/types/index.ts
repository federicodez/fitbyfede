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

export type CurrentUser = {
  email: string;
  emailVerified: string | null;
  hashedPassword: string | null;
  id: string;
  image?: string | null;
  name: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  hashedPassword: string | null;
  emailVerified: string | null;
  workouts: Workout[] | null;
};

export type Workout = {
  id: string;
  exercise: string;
  lbs: number[];
  reps: number[];
  user?: User;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Exercises = {
  exercises: [string, string];
};
