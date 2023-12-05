"use client";
import { useState } from "react";
import { createMeasurement } from "@/actions/measurements/createMeasurements";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const Measurements = () => {
  const [editing, setEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      age: 0,
      weight: 0,
      height: 0,
      upperArm: 0,
      lowerArm: 0,
      upperLeg: 0,
      lowerLeg: 0,
      chest: 0,
      abdominal: 0,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <div className=" bg-[#24293e] rounded-md border-2 border-[#8ebbff]">
      <h1 className="text-center mt-4 text-[#8ebbff] text-xl font-semibold">
        Measurements
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="wrapper">
        <div className="grid grid-cols-3 mt-4">
          <div className="flex flex-col mx-auto">
            <label htmlFor="age" className="text-center text-[#8ebbff]">
              Age
            </label>
            <input
              {...register("age")}
              tabIndex={0}
              type="number"
              pattern="[0-9]*"
              inputMode="decimal"
              name="age"
              id="age"
              className="mx-auto pl-2 bg-gray-300 text-black rounded-lg w-14 md:w-20"
            />
          </div>
          <div className="flex flex-col mx-auto">
            <label htmlFor="height" className="text-center text-[#8ebbff]">
              Height
            </label>
            <input
              {...register("height")}
              type="number"
              pattern="[0-9]*"
              inputMode="decimal"
              name="height"
              id="height"
              className="mx-auto pl-2 bg-gray-300 text-black rounded-lg w-14 md:w-20"
            />
          </div>
          <div className="flex flex-col mx-auto">
            <label htmlFor="weight" className="text-center text-[#8ebbff]">
              Weight
            </label>
            <input
              {...register("weight")}
              type="number"
              pattern="[0-9]*"
              inputMode="decimal"
              name="weight"
              id="weight"
              className="mx-auto pl-2 bg-gray-300 text-black rounded-lg w-14 md:w-20"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 mb-4">
          <div className="flex flex-col mx-auto my-2">
            <label htmlFor="upperArm" className="text-center text-[#8ebbff]">
              Upper Arm
            </label>
            <input
              {...register("upperArm")}
              type="number"
              pattern="[0-9]*"
              inputMode="decimal"
              name="upperArm"
              id="upperArm"
              className="mx-auto pl-2 bg-gray-300 text-black rounded-lg w-14 md:w-20"
            />
          </div>
          <div className="flex flex-col mx-auto my-2">
            <label htmlFor="lowerArm" className="text-center text-[#8ebbff]">
              Lower Arm
            </label>
            <input
              {...register("lowerArm")}
              type="number"
              pattern="[0-9]*"
              inputMode="decimal"
              name="lowerArm"
              id="lowerArm"
              className="mx-auto pl-2 bg-gray-300 text-black rounded-lg w-14 md:w-20"
            />
          </div>
          <div className="flex flex-col mx-auto my-2">
            <label htmlFor="upperLeg" className="text-center text-[#8ebbff]">
              Upper Leg
            </label>
            <input
              {...register("upperLeg")}
              type="number"
              pattern="[0-9]*"
              inputMode="decimal"
              name="upperLeg"
              id="upperLeg"
              className="mx-auto pl-2 bg-gray-300 text-black rounded-lg w-14 md:w-20"
            />
          </div>
          <div className="flex flex-col mx-auto my-2">
            <label htmlFor="lowerLeg" className="text-center text-[#8ebbff]">
              Lower Leg
            </label>
            <input
              {...register("lowerLeg")}
              type="number"
              pattern="[0-9]*"
              inputMode="decimal"
              name="lowerLeg"
              id="lowerLeg"
              className="mx-auto pl-2 bg-gray-300 text-black rounded-lg w-14 md:w-20"
            />
          </div>
          <div className="flex flex-col mx-auto my-2">
            <label htmlFor="chest" className="text-center text-[#8ebbff]">
              Chest
            </label>
            <input
              {...register("chest")}
              type="number"
              pattern="[0-9]*"
              inputMode="decimal"
              name="chest"
              id="chest"
              className="mx-auto pl-2 bg-gray-300 text-black rounded-lg w-14 md:w-20"
            />
          </div>
          <div className="flex flex-col mx-auto my-2">
            <label htmlFor="abdominal" className="text-center text-[#8ebbff]">
              Abdominal
            </label>
            <input
              {...register("abdominal")}
              type="number"
              pattern="[0-9]*"
              inputMode="decimal"
              name="abdominal"
              id="abdominal"
              className="mx-auto pl-2 bg-gray-300 text-black rounded-lg w-14 md:w-20"
            />
          </div>
        </div>
        <input type="submit" className="mx-auto w-full mb-4 text-[#8ebbff]" />
      </form>
    </div>
  );
};

export default Measurements;
