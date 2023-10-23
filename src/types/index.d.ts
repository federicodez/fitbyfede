import { MouseEventHandler } from "react";

export type CustomButtonProps = {
  title: string;
  containerStyles?: string;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
  btnType?: "button" | "submit";
};

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  hashedPassword: string | null;
  emailVerified: string | null;
  image: string | null;
};

export type Workout = {
  id: string;
  name: string;
  bodyPart: string;
  gifId?: string | null;
  target: string;
  equipment?: string | null;
  instructions: string[];
  sets: string[];
  lbs: number[];
  reps: number[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  workoutSessionId: string;
};

export type Data = {
  bodyPart: string;
  equipment: string;
  id: string;
  name: string;
  target: string;
  secondaryMuscles: string[];
  instructions: string[];
}[];
