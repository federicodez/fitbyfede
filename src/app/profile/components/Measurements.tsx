"use client";
import { useState } from "react";
import type { Measurement } from "@/types";
import { AddMeasurement, MeasurementList } from ".";

type MeasurementsProps = {
  measurements: Measurement[] | [];
};

const Measurements = ({ measurements }: MeasurementsProps) => {
  console.log("measurements: ", measurements);
  const measurement = measurements[measurements.length - 1];

  return (
    <div className=" bg-[#24293e] rounded-md border-2 border-[#8ebbff] pb-4">
      <h1 className="text-center mt-4 text-[#8ebbff] text-xl font-semibold">
        Measurements
      </h1>
      <AddMeasurement measurement={measurement} />
    </div>
  );
};

export default Measurements;
