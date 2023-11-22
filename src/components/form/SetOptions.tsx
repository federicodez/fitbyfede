type SetOptionProps = {
  workoutId: string;
  setOptions: boolean;
  setSetOptions: React.Dispatch<React.SetStateAction<boolean>>;
  changeSet: (id: string, option: string) => void;
  setId: string;
  setIdx: number;
  setIndex: number;
};

const SetOptions = ({
  workoutId,
  setOptions,
  setSetOptions,
  changeSet,
  setId,
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
        setId === workoutId && setIndex === setIdx
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
            setSetOptions(!setOptions);
          }}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};

export default SetOptions;
