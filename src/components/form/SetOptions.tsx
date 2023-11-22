type SetOptionProps = {
  workoutId: string;
  setOptions: string | null;
  setSetOptions: React.Dispatch<React.SetStateAction<string | null>>;
  changeSet: (id: string, option: string) => void;
  setIdx: number;
  setIndex: number;
};

const SetOptions = ({
  workoutId,
  setOptions,
  setSetOptions,
  changeSet,
  setIdx,
  setIndex,
}: SetOptionProps) => {
  const options = [
    { type: "w", label: "Warm-up" },
    { type: "d", label: "Drop Set" },
    { type: "f", label: "Failure" },
  ];
  return (
    <div
      className={
        setOptions === workoutId && setIndex === setIdx
          ? `absolute w-fit top-0 left-0 z-10 bg-gray-800 text-white rounded-lg cursor-pointer p-2 md:ml-20`
          : "hidden"
      }
    >
      {options.map((option, idx) => (
        <div
          key={idx}
          className=""
          id={option.type}
          onClick={() => {
            changeSet(workoutId, option.type);
            setSetOptions(null);
          }}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};

export default SetOptions;
