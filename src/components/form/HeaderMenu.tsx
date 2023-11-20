import React from "react";
import { HiX } from "react-icons/hi";
import { AiFillEdit } from "react-icons/ai";
import { SlOptions } from "react-icons/sl";

type HeaderMenuProps = {
  sessionOptions: boolean;
  setSessionOptions: React.Dispatch<React.SetStateAction<boolean>>;
  setWorkoutName: React.Dispatch<React.SetStateAction<string>>;
  setDateInput: React.Dispatch<React.SetStateAction<boolean>>;
};

const HeaderMenu = ({
  sessionOptions,
  setSessionOptions,
  setWorkoutName,
  setDateInput,
}: HeaderMenuProps) => {
  return (
    <>
      <div
        className={
          sessionOptions
            ? "absolute w-fit z-10 bg-[#8ebbff] text-[#2f3651] rounded-lg p-2 cursor-pointer"
            : "hidden"
        }
      >
        <div className="flex flex-col">
          <div
            role="button"
            onClick={() => setSessionOptions(false)}
            className="flex justify-center text-white bg-[#2f3651] px-2 py-1 mb-5 h-fit rounded-md right-0"
          >
            <HiX role="none" />
          </div>
          <div
            role="button"
            onClick={() => {
              setWorkoutName(" ");
              setSessionOptions(false);
            }}
            className="flex flex-row items-center gap-2 m-1"
          >
            <AiFillEdit role="none" className="" />
            <span>Edit</span>
            <span>Workout</span>
            <span>Name</span>
          </div>
          <div
            role="button"
            className="flex flex-row items-center gap-2 m-1"
            onClick={() => setDateInput(true)}
          >
            <AiFillEdit role="none" className="" />
            <span>Edit</span>
            <span>Workout</span>
            <span>Date</span>
          </div>
        </div>
      </div>
      <SlOptions
        role="button"
        onClick={() => setSessionOptions(true)}
        className="flex w-10 bg-gray-300 text-black rounded-md px-2 right-0"
      />
    </>
  );
};

export default HeaderMenu;
