"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";

const Avatar = () => {
  const { data: session } = useSession();
  return (
    <div className="avatar">
      <h1 className="text-center font-bold">Profile</h1>
      <Image
        className="profile-image"
        src={session?.user?.image || "/placeholder.jpg"}
        alt="Avatar"
        width={100}
        height={100}
        priority={true}
      />
      <p>{session?.user?.name}</p>
    </div>
  );
};

export default Avatar;
