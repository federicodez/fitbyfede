import { HiX } from "react-icons/hi";
import { AiFillEdit } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { TbReplace } from "react-icons/tb";
import { BiTimer } from "react-icons/bi";

type MenuOptionsProps = {
  id: string;
  setAddNote: React.Dispatch<React.SetStateAction<string | boolean>>;
  replace: boolean;
  openMenu: string | boolean;
  setNotes: React.Dispatch<React.SetStateAction<string>>;
  setOpenMenu: React.Dispatch<React.SetStateAction<string | boolean>>;
  setReplace: React.Dispatch<React.SetStateAction<boolean>>;
  removeExercise: (id: string) => void;
};

const MenuOptions = ({
  id,
  setAddNote,
  replace,
  openMenu,
  setNotes,
  setOpenMenu,
  setReplace,
  removeExercise,
}: MenuOptionsProps) => {
  return (
    <>
      <div
        className={
          openMenu === id
            ? "absolute w-56 z-10 bg-gray-800 text-white rounded-lg right-0 p-2 cursor-pointer"
            : "hidden"
        }
      >
        <div
          onClick={() => setOpenMenu(false)}
          className="flex justify-center text-black bg-gray-300 px-2 py-1 mb-5 h-fit rounded-md right-0"
        >
          <HiX />
        </div>
        <div
          onClick={() => {
            setAddNote(id);
            setNotes(" ");
            setOpenMenu(false);
          }}
          className="flex flex-row items-center gap-2"
        >
          <AiFillEdit className="text-blue-500" />
          <span>Add</span>
          <span>a</span>
          <span>Note</span>
        </div>
        <div className="flex flex-row items-center flex-nowrap gap-2 my-5">
          <MdAdd className="text-blue-500" />
          <span>Add</span>
          <span>Warm-up</span>
          <span>Sets</span>
        </div>
        <div
          className="flex flex-row items-center gap-2 my-5"
          onClick={() => {
            setReplace(!replace);
            setOpenMenu(false);
          }}
        >
          <TbReplace className="text-blue-499" />
          <span>Replace</span>
          <span>Exercise</span>
        </div>
        <div className="flex flex-row items-center gap-2 my-5">
          <BiTimer className="text-blue-500" />
          <span>Auto</span>
          <span>Rest</span>
          <span>Timer</span>
        </div>
        <div
          className={openMenu ? "flex flex-row items-center gap-2" : "hidden"}
          onClick={() => {
            removeExercise(id);
            setOpenMenu(false);
          }}
        >
          <HiX className="text-red-500" />
          <span>Remove</span>
          <span>Exercise</span>
        </div>
      </div>
    </>
  );
};

export default MenuOptions;