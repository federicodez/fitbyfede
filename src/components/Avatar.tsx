"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";

const Avatar = () => {
  const { data: session } = useSession();
  return (
    <div className="avatar">
      <Image
        className="profile-image"
        src={session?.user?.image || "/placeholder.jpg"}
        alt="Avatar"
        width={100}
        height={100}
      />
      <p>{session?.user?.name}</p>
    </div>
  );
};

export default Avatar;