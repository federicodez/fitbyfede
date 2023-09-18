"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  // console.log({ session });
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
        <p>{session?.user?.name}</p>
      </div>
    </section>
  );
};

export default Profile;
