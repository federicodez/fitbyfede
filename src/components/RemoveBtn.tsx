import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { deleteWorkout } from "@/actions";

type RemoveProps = {
  id: string;
};

const RemoveBtn = ({ id }: RemoveProps) => {
  const router = useRouter();
  const removeWorkout = async () => {
    await deleteWorkout(id);
    router.refresh();
  };
  return (
    <button onClick={removeWorkout}>
      <HiOutlineTrash />
    </button>
  );
};

export default RemoveBtn;
