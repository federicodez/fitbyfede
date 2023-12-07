import { Workout } from "@/types";
import Image from "next/image";
import { AiOutlineQuestion } from "react-icons/ai";

type RecentListProps = {
  recent: Workout[];
  setDetails: React.Dispatch<React.SetStateAction<string | boolean>>;
};

const RecentList = ({ recent, setDetails }: RecentListProps) =>
  recent.map(({ bodyPart, gifId, id, name }) => (
    <li key={id} className="my-4">
      <div className="grid grid-cols-4 items-center rounded-md bg-[#2f3651] border-white border">
        <Image
          className="col-span-1"
          id="gif"
          src={`https://fitbyfede-db.s3.amazonaws.com/1080/${gifId}.gif`}
          width={100}
          height={100}
          alt="workout gif"
          priority
        />
        <div className="col-span-2 flex flex-col items-center mx-2">
          <strong id="name" className="w-full">
            {name}
          </strong>
          <span className="w-full">{bodyPart}</span>
        </div>
        <div
          role="button"
          onClick={() => setDetails(id)}
          className="justify-self-end bg-white rounded-md text-black w-fit p-1 mr-5"
        >
          <AiOutlineQuestion role="none" />
        </div>
      </div>
    </li>
  ));

export default RecentList;
