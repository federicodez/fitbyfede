"use client";

import { useSession } from "next-auth/react";

const Memberships = () => {
  const { data: session } = useSession();

  return (
    <div className="h-screen p-5 p-color">
      <h1 className="text-2xl font-semibold w-full text-center mb-4 text-[#8ebbff]">
        Upgrade
      </h1>
      <ul className="flex flex-col gap-4">
        <li className="flex flex-row border rounded-md p-2 bg-[#8ebbff] text-black">
          <div className="flex flex-col text-center">
            <div>$4.99</div>
            <div>MONTHLY</div>
          </div>
          <div className="m-auto">Start 1-Month Free Trial</div>
        </li>
        <li className="flex flex-row border rounded-md p-2 bg-[#8ebbff] text-black">
          <div className="flex flex-col text-center">
            <div>$29.99</div>
            <div>YEARLY</div>
          </div>
          <div className="m-auto">Start 1-Year Subscription</div>
        </li>
        <li className="flex flex-row border rounded-md p-2 bg-[#8ebbff] text-black">
          <div className="flex flex-col text-center">
            <div>$99.99</div>
            <div>ONCE</div>
          </div>
          <div className="m-auto">Unlock PRO Forever</div>
        </li>
      </ul>
    </div>
  );
};

export default Memberships;
