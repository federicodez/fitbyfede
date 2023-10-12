import { MouseEvent } from "react";

type SetOptionProps = {
  id: string;
  setOptions: string | null;
  setSetOptions: React.Dispatch<React.SetStateAction<string | null>>;
  changeSet: (id: string, e: MouseEvent) => void;
};

const SetOptions = ({
  setOptions,
  setSetOptions,
  changeSet,
  id,
}: SetOptionProps) => {
  return (
    <div
      onMouseLeave={() => setSetOptions(null)}
      className={
        setOptions === id
          ? `absolute bg-gray-800 text-white ml-20 px-2 rounded-lg`
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
