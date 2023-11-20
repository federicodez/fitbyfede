"use client";

import { useState } from "react";
import { SlOptions } from "react-icons/sl";
import DeleteAccountBtn from "./DeleteAccountBtn";
import { signOut } from "next-auth/react";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";

const Settings = () => {
  const [options, setOptions] = useState(false);
  const [tryDelete, setTryDelete] = useState(false);

  return (
    <div>
      <div
        role="button"
        className={
          options
            ? "absolute z-10 border rounded-md backdrop-blur-lg overflow-hidden px-4 py-2 cursor-pointer"
            : "hidden"
        }
      >
        <div
          className="px-4 py-px mb-4 rounded-md w-fit border"
          onClick={() => {
            setOptions(false);
            setTryDelete(true);
          }}
        >
          Delete Account
        </div>
        <div
          role="button"
          className="flex flex-row justify-center items-center gap-2 px-4 py-px mt-4 rounded-md w-fit border"
          onClick={() => signOut()}
        >
          <HiArrowLeftOnRectangle />
          Sign Out
        </div>
      </div>
      <div
        role="button"
        className="px-4 py-px bg-[#8ebbff] rounded-md w-fit border"
        onClick={() => setOptions(true)}
      >
        <SlOptions role="presentation" className="text-black" />
      </div>
      {tryDelete && (
        <DeleteAccountBtn tryDelete={tryDelete} setTryDelete={setTryDelete} />
      )}
    </div>
  );
};
export default Settings;
