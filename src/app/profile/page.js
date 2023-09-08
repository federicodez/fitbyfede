"use client";
import { useSession, signOut } from "next-auth/react";
import { Unauth } from "@/components";

export default function Profile() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <section className="profile wrapper container">
      <Unauth>
        <button className="sign-out-btn" onClick={() => signOut()}>
          Sign Out
        </button>
        <div className="profile-card">
          <h1 className="profile-title">Profile</h1>
          <p className="user-name">{session?.user?.name}</p>
        </div>
      </Unauth>
    </section>
  );
}
