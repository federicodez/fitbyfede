"use client";

import { useState, useEffect, useRef } from "react";
import { SlOptions } from "react-icons/sl";
import DeleteAccountBtn from "./DeleteAccountBtn";
import { signOut } from "next-auth/react";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import axios from "axios";
import { useSession } from "next-auth/react";

const Settings = () => {
  const settingsRef = useRef<HTMLDivElement | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [tryDelete, setTryDelete] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (!isSettingsOpen) return;
    const checkIfClickedOutside = (e: MouseEvent | TouchEvent) => {
      if (
        settingsRef?.current &&
        !settingsRef?.current?.contains(e.target as HTMLElement)
      ) {
        setIsSettingsOpen(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [settingsRef, isSettingsOpen, setIsSettingsOpen]);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const { data } = await axios.get("/api/customer");
        data.data.forEach((customer: any) => {
          if (customer?.email === session?.user?.email) {
            setSubscribed(true);
          }
        });
        return data;
      } catch (error) {
        console.log(error);
      }
    };
    fetchCustomer();
  }, [session]);

  return (
    <div>
      {isSettingsOpen && (
        <div
          ref={settingsRef}
          role="button"
          className="absolute z-10 border rounded-md backdrop-blur-lg overflow-hidden px-4 py-2 cursor-pointer"
        >
          {subscribed && (
            <div
              role="button"
              className="px-4 py-px mb-4 rounded-md w-fit border"
            >
              Cancel Subscription
            </div>
          )}
          <div
            role="button"
            className="px-4 py-px mb-4 rounded-md w-fit border"
            onClick={() => {
              setIsSettingsOpen(!isSettingsOpen);
              setTryDelete(true);
            }}
          >
            Delete Account
          </div>
          <div
            role="button"
            className="flex flex-row justify-center items-center gap-2 px-4 py-px mt-4 rounded-md w-fit border"
            onClick={() => {
              setIsSettingsOpen(!isSettingsOpen);
              signOut();
            }}
          >
            <HiArrowLeftOnRectangle role="none" />
            Sign Out
          </div>
        </div>
      )}
      <button
        className="px-4 py-px bg-[#8ebbff] text-black rounded-md w-fit border"
        onClick={() => setIsSettingsOpen(true)}
      >
        <SlOptions role="none" />
      </button>
      {tryDelete && (
        <DeleteAccountBtn tryDelete={tryDelete} setTryDelete={setTryDelete} />
      )}
    </div>
  );
};
export default Settings;
