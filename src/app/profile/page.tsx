"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components";

const Profile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <section className="profile wrapper container">
      <button
        className="sign-out-btn"
        onClick={() => {
          signOut();
          router.push("/");
        }}
      >
        Sign Out
      </button>
      <div className="profile-card">
        <h1 className="profile-title">Profile</h1>
        <Avatar />
        <p>{session?.user?.name}</p>
      </div>
    </section>
  );
};

export default Profile;
