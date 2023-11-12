type ReplaceBtnProps = {
  id: string;
  replace: string | boolean;
  setReplace: React.Dispatch<React.SetStateAction<string | boolean>>;
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
    <div
      className={`
      fixed 
      z-10
      p-3
      text-black
      top-1/2 
      left-1/2 
      -translate-y-1/2 
      -translate-x-1/2 
      rounded-lg 
      bg-[#8ebbff] 
      w-[450px] 
      h-fit
      md:w-[850px] 
      md:top-1/2
      md:left-2/3
      md:-translate-x-3/4
      md:-translate-y-1/2
      shadow-[inset_0_-3em_3em_rgba(0,0,0,0.1),0.3em_0.3em_1em_rgba(0,0,0,0.3)]
    `}
    >
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
    </div>
  );
};

export default ReplaceBtn;
