"use client";

import { useState, useEffect, useRef } from "react";
import { SlOptions } from "react-icons/sl";
import DeleteAccountBtn from "./DeleteAccountBtn";
import { signOut } from "next-auth/react";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { AiOutlineQuestion } from "react-icons/ai";

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
          className="absolute z-10 border rounded-md bg-[#8ebbff] px-4 py-2 cursor-pointer"
        >
          {subscribed ? (
            <div className="px-4 py-px mb-4 rounded-md w-fit border bg-[#2f3651]">
              <Link
                role="button"
                target="_blank"
                rel="noopener"
                href="https://billing.stripe.com/p/login/28ocQC8Afdffc24288"
              >
                Cancel Subscription
              </Link>
            </div>
          ) : (
            <div className="px-4 py-px mb-4 rounded-md w-fit border bg-[#2f3651]">
              <Link
                role="button"
                target="_blank"
                rel="noopener"
                aria-label="subscribe"
                href="https://buy.stripe.com/cN2012dsqeP2aEUfYY"
              >
                Subscribe
              </Link>
            </div>
          )}
          <div
            role="button"
            className="px-4 py-px mb-4 rounded-md w-fit border bg-[#2f3651]"
            onClick={() => {
              setIsSettingsOpen(!isSettingsOpen);
              setTryDelete(true);
            }}
          >
            Delete Account
          </div>
          <div
            role="button"
            className="flex flex-row justify-center items-center gap-2 px-4 py-px mt-4 rounded-md w-fit border bg-[#2f3651]"
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
        className="px-4 py-px text-black rounded-md w-fit border bg-[#2f3651]"
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
