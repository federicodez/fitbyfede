import { useState } from "react";
import { HiX } from "react-icons/hi";

type MenuOptionsProps = {
  setNotes: React.Dispatch<React.SetStateAction<string>>;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuOptions = ({ setNotes, setOpenMenu }: MenuOptionsProps) => {
  return (
    <>
      <HiX />
    </>
  );
};

export default MenuOptions;
