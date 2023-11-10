import { HiX } from "react-icons/hi";
import { AiFillEdit } from "react-icons/ai";
import { MdAdd } from "react-icons/md";
import { TbReplace } from "react-icons/tb";
import { BiTimer } from "react-icons/bi";

type MenuOptionsProps = {
  id: string;
  noteIds: string[];
  setNoteIds: React.Dispatch<React.SetStateAction<string[]>>;
  replace: boolean;
  openMenu: string | boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<string | boolean>>;
  setReplace: React.Dispatch<React.SetStateAction<boolean>>;
  removeExercise: (id: string) => void;
};

const MenuOptions = ({
  id,
  noteIds,
  setNoteIds,
  replace,
  openMenu,
  setOpenMenu,
  setReplace,
  removeExercise,
}: MenuOptionsProps) => {
  const handleNotes = (id: string) => {
    if (noteIds.includes(id)) {
      const newNotes = noteIds.filter((noteId) => noteId !== id);
      setNoteIds([...newNotes]);
    } else {
      noteIds.push(id);
    }
  };

  return (
    <>
      <div
        className={
          openMenu === id
            ? "absolute w-56 z-10 bg-[#8ebbff] text-black rounded-lg right-0 p-2 cursor-pointer"
            : "hidden"
        }
      >
        <div
          onClick={() => setOpenMenu(false)}
          className="flex justify-center text-white bg-[#2f3651] px-2 py-1 mb-5 h-fit rounded-md right-0"
        >
          <HiX />
        </div>
        <div
          onClick={() => {
            handleNotes(id);
            setOpenMenu(false);
          }}
          className="flex flex-row items-center gap-2"
        >
          <AiFillEdit className="text-black" />
          <span>Add</span>
          <span>a</span>
          <span>Note</span>
        </div>
        <div className="flex flex-row items-center flex-nowrap gap-2 my-5">
          <MdAdd className="text-black" />
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
          <TbReplace className="text-black" />
          <span>Replace</span>
          <span>Exercise</span>
        </div>
        <div className="flex flex-row items-center gap-2 my-5">
          <BiTimer className="text-black" />
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
          <span className="text-red-800">Remove</span>
          <span className="text-red-800">Exercise</span>
        </div>
      </div>
    </>
  );
};

export default MenuOptions;
