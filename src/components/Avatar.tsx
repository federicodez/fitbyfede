"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { Settings } from "@/app/profile/components";

const Avatar = () => {
  const { data: session } = useSession();
  return (
    <div>
      <div>
        <div className="absolute w-60">
          <Settings />
        </div>
        <h1 className="text-center text-[#8ebbff] font-semibold">
          {session?.user?.name}
        </h1>
      </div>
      <Image
        className="mx-auto rounded-md"
        src={session?.user?.image || "/placeholder.jpg"}
        alt="Avatar"
        width={100}
        height={100}
        priority={true}
      />
    </div>
  );
};

export default Avatar;
