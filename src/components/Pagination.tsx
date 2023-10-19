import React from "react";

type PaginationProps = {
  currentPage: number;
  workoutsPerPage: number;
  totalWorkouts: number;
  paginate: (pageNumber: number) => void;
};

const Pagination = ({
  currentPage,
  workoutsPerPage,
  totalWorkouts,
  paginate,
}: PaginationProps) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalWorkouts / workoutsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="flex flex-1 flex-wrap justify-center items-center gap-5">
      {pageNumbers.map((number) => (
        <li
          key={number}
          onClick={() => paginate(number)}
          className={`w-5 pl-1 rounded-md cursor-pointer ${
            currentPage === number ? "bg-gray-800 text-white" : null
          }`}
        >
          {number}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
