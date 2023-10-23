"use client";

import React from "react";

import { useRouter } from "next/navigation";
import { CustomButton } from ".";

type ShowMoreProps = {
  pageNumber: number;
  isNext: boolean;
};

const ShowMore = ({ pageNumber, isNext }: ShowMoreProps) => {
  const router = useRouter();

  const handleNavigation = () => {
    const newLimit = (pageNumber + 1) * 100;
  };
  return (
    <div className="w-full flex-center gap-5 mt-10 mb-50">
      {!isNext && (
        <CustomButton
          title="Show More"
          btnType="button"
          containerStyles="bg-primary-blue rounded-full text-white"
          handleClick={handleNavigation}
        />
      )}
    </div>
  );
};

export default ShowMore;
