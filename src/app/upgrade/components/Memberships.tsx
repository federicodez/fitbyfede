"use client";
import Link from "next/link";

const Memberships = () => {
  return (
    <div className="h-screen p-5">
      <h1 className="text-2xl font-semibold w-full text-center mb-4 text-[#8ebbff]">
        Upgrade
      </h1>
      <Link
        aria-label="subscribe"
        href="https://buy.stripe.com/cN2012dsqeP2aEUfYY"
        target="_blank"
        rel="noreferrer noopener"
        className="flex flex-row border rounded-md p-2 bg-[#8ebbff] text-black"
      >
        <div className="flex flex-col text-center">
          <div>$2.99</div>
          <div>MONTHLY</div>
        </div>
        <div className="m-auto">Start 1-Month Free Trial</div>
      </Link>
    </div>
  );
};

export default Memberships;
