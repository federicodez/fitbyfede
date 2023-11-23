import React, { useEffect, useRef } from "react";
import { AiFillEdit } from "react-icons/ai";

type HeaderMenuProps = {
  setWorkoutName: React.Dispatch<React.SetStateAction<string>>;
  dateInput: boolean;
  setDateInput: React.Dispatch<React.SetStateAction<boolean>>;
  isHeaderOpen: boolean;
  setIsHeaderOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const HeaderMenu = ({
  setWorkoutName,
  dateInput,
  setDateInput,
  isHeaderOpen,
  setIsHeaderOpen,
}: HeaderMenuProps) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isHeaderOpen) return;
    const checkIfClickedOutside = (e: any) => {
      if (
        menuRef?.current &&
        !menuRef?.current?.contains(e.target as HTMLElement)
      ) {
        setIsHeaderOpen(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [menuRef]);

  return (
    <div
      ref={menuRef}
      className="absolute w-fit z-10 bg-[#8ebbff] text-[#2f3651] rounded-lg px-2 cursor-pointer"
    >
      <div className="flex flex-col">
        <div
          role="button"
          onClick={() => {
            setWorkoutName(" ");
            setIsHeaderOpen(!isHeaderOpen);
          }}
          className="flex flex-row w-full items-center gap-2 m-1"
        >
          <AiFillEdit role="none" className="" />
          <span>Edit</span>
          <span>Workout</span>
          <span>Name</span>
        </div>
        <div
          role="button"
          className="flex flex-row items-center gap-2 m-1"
          onClick={() => {
            setIsHeaderOpen(!isHeaderOpen);
            setDateInput(!dateInput);
          }}
        >
          <AiFillEdit role="none" className="" />
          <span>Edit</span>
          <span>Workout</span>
          <span>Date</span>
        </div>
      </div>
    </div>
  );
};

export default HeaderMenu;
