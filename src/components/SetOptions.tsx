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
  return (
    <div
      onMouseLeave={() => setSetOptions(null)}
      className={
        setOptions === id && setIndex === setId
          ? `absolute bg-gray-800 text-white rounded-lg cursor-pointer`
          : "hidden"
      }
    >
      <option
        value="w"
        onClick={(e) => {
          changeSet(id, e);
          setSetOptions(null);
        }}
      >
        Warm-up
      </option>

      <option
        value="d"
        onClick={(e) => {
          changeSet(id, e);
          setSetOptions(null);
        }}
      >
        Drop Set
      </option>

      <option
        value="f"
        onClick={(e) => {
          changeSet(id, e);
          setSetOptions(null);
        }}
      >
        Failure
      </option>
    </div>
  );
};

export default SetOptions;
