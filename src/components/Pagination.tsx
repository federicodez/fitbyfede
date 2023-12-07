import { useState, useMemo } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { CustomData } from "@/types";

type PaginationProps = {
  currentPage: number;
  workoutsPerPage: number;
  workouts: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

export const paginate = (
  workouts: CustomData,
  currentPage: number,
  workoutsPerPage: number,
) => {
  const startIndex = (currentPage - 1) * workoutsPerPage;
  return workouts?.slice(startIndex, startIndex + workoutsPerPage);
};

export const Pagination = ({
  currentPage,
  workoutsPerPage,
  workouts,
  setCurrentPage,
}: PaginationProps) => {
  const pagesCount = Math.ceil(workouts / workoutsPerPage);
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
  const [startIndex, setStartIndex] = useState(currentPage);
  const [endIndex, setEndIndex] = useState(currentPage + 4);
  const pageSet = pages.slice(startIndex - 1, endIndex);

  const prevSet = () => {
    if (endIndex > 0) {
      setEndIndex(endIndex - 5);
      setStartIndex(startIndex - 5);
      setCurrentPage(currentPage - 5);
    }
  };

  const nextSet = () => {
    if (endIndex < 27) {
      setEndIndex(endIndex + 5);
      setStartIndex(startIndex + 5);
      setCurrentPage(currentPage + 5);
    }
  };

  return (
    <ul className="flex flex-row justify-center items-center gap-5">
      {startIndex > 1 ? (
        <button
          type="button"
          className="backdrop-blur-lg overflow-hidden rounded-md"
          onClick={prevSet}
        >
          <IoIosArrowBack role="none" className="text-3xl" />
        </button>
      ) : (
        <button type="button">
          <IoIosArrowBack role="none" className="text-2xl opacity-50" />
        </button>
      )}
      {pageSet.map((page) => (
        <li
          key={page}
          className={`cursor-pointer ${
            currentPage === page
              ? "bg-[#8ebbff] text-black"
              : "bg-[#2f3651] text-[#8ebbff]"
          }`}
        >
          <a
            className="flex justify-center items-center w-8 h-8 border-2 rounded-md cursor-pointer"
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </a>
        </li>
      ))}
      {endIndex < 27 ? (
        <button
          type="button"
          className="backdrop-blur-lg overflow-hidden rounded-md"
          onClick={nextSet}
        >
          <IoIosArrowForward role="none" className="text-3xl" />
        </button>
      ) : (
        <button type="button">
          <IoIosArrowForward role="none" className="text-2xl opacity-50" />
        </button>
      )}
    </ul>
  );
};
