type ReplaceBtnProps = {
  id: string;
  replace: boolean;
  setReplace: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenMenu: React.Dispatch<React.SetStateAction<string | boolean>>;
  setAddExercise: React.Dispatch<React.SetStateAction<boolean>>;
  removeExercise: (id: string) => void;
};

const ReplaceBtn = ({
  id,
  replace,
  setReplace,
  setOpenMenu,
  removeExercise,
  setAddExercise,
}: ReplaceBtnProps) => {
  return (
    <div className="grid grid-cols-3">
      <div
        className={
          replace
            ? "absolute top-50 z-10 bg-white rounded-lg grid grid-cols-2 p-4 mr-4 md:ml-40"
            : "hidden"
        }
      >
        <h3 className="col-span-2 text-center">Replace Exercise?</h3>
        <span className="col-span-2 text-center">
          All previously entered sets will be replaced.
        </span>
        <button
          className="m-1 px-4 bg-gray-300 rounded-md"
          onClick={() => {
            setOpenMenu(false);
            setReplace(!replace);
          }}
        >
          Cancel
        </button>
        <button
          className="m-1 px-4 bg-red-500 rounded-md"
          onClick={() => {
            removeExercise(id);
            setReplace(!replace);
            setAddExercise(true);
          }}
        >
          Replace
        </button>
      </div>
    </div>
  );
};

export default ReplaceBtn;
