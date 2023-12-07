import { Workout } from "@/types";
import Image from "next/image";
import { HiX } from "react-icons/hi";

type RecentDetailsProps = {
  recent: Workout[];
  details: string | boolean;
  setDetails: React.Dispatch<React.SetStateAction<string | boolean>>;
};

const RecentDetails = ({ recent, details, setDetails }: RecentDetailsProps) =>
  recent?.map(({ gifId, id, name, instructions }) => (
    <li key={id} className="p-color">
      <div
        className={
          details === id
            ? `flex flex-col p-5 my-10 rounded-md  shadow-[inset_0_-3em_3em_rgba(0,0,0,0.1),0_0_0_2px_rgb(255,255,255),0.3em_0.3em_1em_rgba(0,0,0,0.3)]`
            : "hidden"
        }
      >
        <button
          type="button"
          className="flex justify-center items-center w-10 h-5 rounded-lg bg-gray-50"
          onClick={() => setDetails(false)}
        >
          <HiX role="none" />
        </button>
        <h1 className="text-center m-2 font-bold" id="name">
          {name}
        </h1>
        <Image
          className="flex self-center rounded-md"
          id="gif"
          src={`https://fitbyfede-db.s3.amazonaws.com/1080/${gifId}.gif`}
          height={400}
          width={400}
          alt="exercise gif"
        />
        <h1 className="text-center m-2 underline font-semibold">
          Instructions
        </h1>
        <ol className="px-10">
          {instructions.map((item, itemId) => (
            <li key={itemId} id="intructions" className="list-decimal">
              {item}
            </li>
          ))}
        </ol>
      </div>
    </li>
  ));

export default RecentDetails;
