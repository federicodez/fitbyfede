"use client";
import { Measurement } from "@/types";

type MeasurementListProps = {
  measurement: Measurement | null;
  update: boolean;
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

const MeasurementList = ({
  measurement,
  update,
  setUpdate,
}: MeasurementListProps) => {
  return (
    <>
      <div className="grid grid-cols-3">
        <div className="flex flex-col mx-auto">
          <div className="text-[#8ebbff]">Weight</div>
          <div className="bg-gray-300 text-[#2f3651] rounded-md px-2 mx-auto">
            {measurement?.weight}
          </div>
        </div>
        <div className="flex flex-col mx-auto">
          <div className="text-[#8ebbff]">Chest</div>
          <div className="bg-gray-300 text-[#2f3651] rounded-md px-2 mx-auto">
            {measurement?.chest}
          </div>
        </div>
        <div className="flex flex-col mx-auto">
          <div className="text-[#8ebbff]">Abdominal</div>
          <div className="bg-gray-300 text-[#2f3651] rounded-md px-2 mx-auto">
            {measurement?.abdominal}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="flex flex-col items-center">
          <div className="text-[#8ebbff]">Upper Arm</div>
          <div className="bg-gray-300 text-[#2f3651] rounded-md px-2 mx-auto">
            {measurement?.upperArm}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-[#8ebbff]">Lower Arm</div>
          <div className="bg-gray-300 text-[#2f3651] rounded-md px-2 mx-auto">
            {measurement?.lowerArm}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-[#8ebbff]">Upper Leg</div>
          <div className="bg-gray-300 text-[#2f3651] rounded-md px-2 mx-auto">
            {measurement?.upperLeg}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-[#8ebbff]">Lower Leg</div>
          <div className="bg-gray-300 text-[#2f3651] rounded-md px-2 mx-auto">
            {measurement?.lowerLeg}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button
          className="bg-[#8ebbff] text-[#24293e] rounded-md px-4"
          onClick={() => setUpdate(true)}
        >
          Update
        </button>
      </div>
    </>
  );
};

export default MeasurementList;
