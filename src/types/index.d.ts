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
  resetToken?: string | null;
  resetTokeExpiry?: number | null;
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
  notes: string;
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

export type WorkoutSession = {
  id: string;
  name: string;
  time: number;
  notes?: string | null;
  userId: string;
  workoutIds: string[];
  createdAt: Date;
  Workout: Workout[];
};

export type Exercise = {
  id: string;
  name: string;
  bodyPart: string;
  category: string;
  userId: string;
  createdAt: Date;
};
