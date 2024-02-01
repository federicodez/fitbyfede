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
  emailVerified: boolean;
  resetToken?: string | null;
  resetTokeExpiry?: number | null;
  image: string | null;
  subscription: boolean;
};

export type Workout = {
  id: string;
  orderId: number;
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
  equipment: string;
  userId: string;
  createdAt: Date;
};

type CustomData = {
  id: string;
  name: string;
  target?: string;
  bodyPart: string;
  equipment: string;
  secondaryMuscles?: string[];
  instructions?: string[];
  category?: string;
  userId?: string;
  createdAt?: Date;
}[];

type Measurement = {
  id: string;
  age: number;
  height: string;
  weight: number;
  upperArm: number;
  lowerArm: number;
  upperLeg: number;
  lowerLeg: number;
  chest: number;
  abdominal: number;
  createdAt: Date;
  userId: string;
};
