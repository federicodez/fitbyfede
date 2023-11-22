import { useEffect, useRef, RefObject, MouseEvent, TouchEvent } from "react";
import ReactDOM from "react-dom";

type SetOptionProps = {
  workoutId: string;
  setOptions: string | null;
  setSetOptions: React.Dispatch<React.SetStateAction<string | null>>;
  changeSet: (id: string, option: string) => void;
  setIdx: number;
  setIndex: number;
  onClose: () => void;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SetOptions = ({
  workoutId,
  setOptions,
  setSetOptions,
  changeSet,
  setIdx,
  setIndex,
  onClose,
  isModalOpen,
  setIsModalOpen,
}: SetOptionProps) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isModalOpen) return;
    const checkIfClickedOutside = (e: any) => {
      if (
        menuRef?.current &&
        !menuRef?.current?.contains(e.target as HTMLElement)
      ) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [menuRef]);

  const options = [
    { type: "w", label: "Warm-up" },
    { type: "d", label: "Drop Set" },
    { type: "f", label: "Failure" },
  ];
  return (
    <div
      ref={menuRef}
      className={
        setOptions === workoutId && setIndex === setIdx
          ? `absolute w-fit top-0 left-0 z-10 bg-gray-800 text-white rounded-lg cursor-pointer p-2 md:ml-20`
          : "hidden"
      }
    >
      {options.map((option, idx) => (
        <div
          role="button"
          key={idx}
          className=""
          id={option.type}
          onClick={() => {
            changeSet(workoutId, option.type);
            setSetOptions(null);
            setIsModalOpen(!isModalOpen);
          }}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};

export default SetOptions;
