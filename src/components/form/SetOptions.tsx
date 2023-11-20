import { MouseEvent } from "react";

type SetOptionProps = {
  id: string;
  setOptions: string | null;
  setSetOptions: React.Dispatch<React.SetStateAction<string | null>>;
  changeSet: (id: string, e: MouseEvent) => void;
  setId: number;
  setIndex: number;
};

const SetOptions = ({
  id,
  setOptions,
  setSetOptions,
  changeSet,
  setId,
  setIndex,
}: SetOptionProps) => {
  const options = [
    { type: "w", label: "Warm-up" },
    { type: "d", label: "Drop Set" },
    { type: "f", label: "Failure" },
  ];
  console.log("fire ", setOptions);
  return (
    <div
      onMouseLeave={() => setSetOptions(null)}
      className={
        setOptions === id && setIndex === setId
          ? `absolute w-full h-full z-10 bg-gray-800 text-white rounded-lg cursor-pointer p-2 md:ml-20`
          : "hidden"
      }
    >
      {options.map((option, idx) => (
        <option
          key={idx}
          className="flex w-full"
          value={option.type}
          onClick={(e) => {
            changeSet(id, e);
            setSetOptions(null);
          }}
        >
          {option.label}
        </option>
      ))}
    </div>
  );
};

export default SetOptions;
