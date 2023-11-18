import React from "react";
import { HiX } from "react-icons/hi";
import { AiFillEdit } from "react-icons/ai";

type HeaderMenuProps = {
  setSessionOptions: React.Dispatch<React.SetStateAction<boolean>>;
  setWorkoutName: React.Dispatch<React.SetStateAction<string>>;
  setDateInput: React.Dispatch<React.SetStateAction<boolean>>;
};

const HeaderMenu = ({
  setSessionOptions,
  setWorkoutName,
  setDateInput,
}: HeaderMenuProps) => {
  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => setSessionOptions(false)}
        className="flex justify-center items-center m-2 py-px text-red-300 bg-[#2f3651] rounded-md"
      >
        <HiX role="none" />
      </button>
      <div
        role="button"
        onClick={() => {
          setWorkoutName(" ");
          setSessionOptions(false);
        }}
        className="flex flex-row items-center gap-2 m-1"
      >
        <AiFillEdit role="presentation" className="" />
        <span>Edit</span>
        <span>Workout</span>
        <span>Name</span>
      </div>
      <div
        role="button"
        className="flex flex-row items-center gap-2 m-1"
        onClick={() => setDateInput(true)}
      >
        <AiFillEdit role="presentation" className="" />
        <span>Edit</span>
        <span>Workout</span>
        <span>Date</span>
      </div>
    </div>
  );
};

export default HeaderMenu;
