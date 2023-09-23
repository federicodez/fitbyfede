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
  exercise: string;
  sets: string[];
  lbs: number[];
  reps: number[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};
