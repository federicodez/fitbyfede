import { CustomData } from "@/types";
import Image from "next/image";
import { AiOutlineCheck, AiOutlineQuestion } from "react-icons/ai";

type FilteredListProps = {
  filteredExercises: CustomData;
  exerciseQueue: string[];
  addToExercises: (id: string) => void;
  setDetails: React.Dispatch<React.SetStateAction<string | boolean>>;
};

const FilteredList = ({
  filteredExercises,
  exerciseQueue,
  setDetails,
  addToExercises,
}: FilteredListProps) => (
  <ul>
    {filteredExercises?.map(({ bodyPart, id, name }) => (
      <li key={id} className="my-4">
        <div
          onClick={() => addToExercises(name)}
          className="grid grid-cols-4 items-center bg-[#24293e] rounded-md border-[#8ebbff] border-2"
        >
          <Image
            className="col-span-1 rounded-l-md"
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
            className={`${
              exerciseQueue.includes(name) ? "bg-[#8ebbff]" : "bg-white"
            } justify-self-end rounded-md text-black w-fit p-1 mr-5`}
          >
            {exerciseQueue.includes(name) ? (
              <AiOutlineCheck role="none" />
            ) : (
              <AiOutlineQuestion role="none" />
            )}
          </div>
        </div>
      </li>
    ))}
  </ul>
);

export default FilteredList;
