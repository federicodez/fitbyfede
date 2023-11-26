import React, { useEffect, useRef } from "react";
import { AiFillEdit } from "react-icons/ai";

type HeaderMenuProps = {
  setWorkoutName: React.Dispatch<React.SetStateAction<string>>;
  isWorkoutNameOpen: boolean;
  setIsWorkoutNameOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isSessionNotesOpen: boolean;
  setIsSessionNotesOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSessionNotes: React.Dispatch<React.SetStateAction<string>>;
  isHeaderOpen: boolean;
  setIsHeaderOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDateOpen: boolean;
  setIsDateOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const HeaderMenu = ({
  setWorkoutName,
  isWorkoutNameOpen,
  setIsWorkoutNameOpen,
  setSessionNotes,
  isSessionNotesOpen,
  setIsSessionNotesOpen,
  isHeaderOpen,
  setIsHeaderOpen,
  isDateOpen,
  setIsDateOpen,
}: HeaderMenuProps) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isHeaderOpen) return;
    const checkIfClickedOutside = (e: MouseEvent | TouchEvent) => {
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
  }, [menuRef, isHeaderOpen, setIsHeaderOpen]);

  return (
    <div
      ref={menuRef}
      className="absolute w-fit z-10 bg-[#8ebbff] text-[#2f3651] rounded-lg px-2 cursor-pointer"
    >
      <div className="flex flex-col">
        <div
          role="button"
          onClick={() => {
            setIsWorkoutNameOpen(!isWorkoutNameOpen);
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
            setIsDateOpen(true);
          }}
        >
          <AiFillEdit role="none" className="" />
          <span>Edit</span>
          <span>Workout</span>
          <span>Date</span>
        </div>
        <div
          role="button"
          className="flex flex-row items-center gap-2 m-1"
          onClick={() => {
            setIsHeaderOpen(!isHeaderOpen);
            setIsSessionNotesOpen(!isSessionNotesOpen);
          }}
        >
          <AiFillEdit role="none" className="" />
          <span>Add</span>
          <span>Workout</span>
          <span>Notes</span>
        </div>
      </div>
    </div>
  );
};

export default HeaderMenu;
