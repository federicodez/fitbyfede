import { deleteAccount } from "@/actions/users/deleteAccount";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

type DeleteAccountBtnProps = {
  tryDelete: boolean;
  setTryDelete: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteAccountBtn = ({
  tryDelete,
  setTryDelete,
}: DeleteAccountBtnProps) => {
  const { data: session } = useSession();
  const router = useRouter();

  const handleDelete = async () => {
    if (session?.user?.email) {
      await deleteAccount(session.user.email);
      signOut();
      router.push("/");
    }
  };
  return tryDelete ? (
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
      w-[450px] 
      md:w-[850px] 
      md:top-1/2
      md:left-2/3
      md:-translate-x-3/4
      md:-translate-y-1/2
      shadow-[inset_0_-3em_3em_rgba(0,0,0,0.1),0.3em_0.3em_1em_rgba(0,0,0,0.3)]
    `}
    >
      <div className="grid grid-cols-3">
        <div className="absolute top-50 z-10 bg-white rounded-lg grid grid-cols-2 p-4 mr-4 md:ml-40">
          <span className="col-span-2 text-center">
            Are you sure you want to delete your account?
          </span>
          <button
            className="m-1 px-4 bg-gray-300 rounded-md"
            onClick={() => setTryDelete(false)}
          >
            Cancel
          </button>
          <button
            className="m-1 px-4 bg-red-500 rounded-md"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default DeleteAccountBtn;
