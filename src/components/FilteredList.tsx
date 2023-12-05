import { CustomData } from "@/types";
import Image from "next/image";
import { AiOutlineQuestion } from "react-icons/ai";

type FilteredListProps = {
  filteredExercises: CustomData;
  setDetails: React.Dispatch<React.SetStateAction<string | boolean>>;
};

const FilteredList = ({ filteredExercises, setDetails }: FilteredListProps) =>
  filteredExercises?.map(({ bodyPart, id, name }) => (
    <li key={id} className="my-4 w-full">
      <div className="grid grid-cols-4 items-center bg-[#2f3651] rounded-md border-white border">
        <Image
          className="col-span-1"
          id="gif"
          src={`https://fitbyfede-db.s3.amazonaws.com/1080/${id}.gif`}
          height={100}
          width={100}
          alt="exercise gif"
          priority
        />
        <div className="col-span-2 flex flex-col items-center mx-2">
          <strong id="name" className="w-full">
            {name}
          </strong>
          <div className="w-full" id="bodypart">
            {bodyPart}
          </div>
        </div>
        <div
          role="button"
          onClick={() => setDetails(id)}
          className="justify-self-end bg-white text-black rounded-md w-fit p-1 mr-5"
        >
          <AiOutlineQuestion role="none" />
        </div>
      </div>
    </li>
  ));

export default FilteredList;
