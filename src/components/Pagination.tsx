import React from "react";
import { Data } from "@/types";

type PaginationProps = {
  currentPage: number;
  workoutsPerPage: number;
  workouts: number;
  onPageChange: (page: number) => void;
};

export const paginate = (
  workouts: Partial<Data>,
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
  onPageChange,
}: PaginationProps) => {
  const pagesCount = Math.ceil(workouts / workoutsPerPage);
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

  return (
    <ul className="flex flex-1 flex-wrap justify-center items-center gap-5">
      {pages.map((page) => (
        <li
          key={page}
          className={`cursor-pointer mb-5 ${
            currentPage === page
              ? "bg-[#8ebbff] text-black"
              : "bg-[#2f3651] text-[#8ebbff]"
          }`}
        >
          <a
            className="flex justify-center items-center w-8 h-8 border-2 rounded-md cursor-pointer"
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}
    </ul>
  );
};
