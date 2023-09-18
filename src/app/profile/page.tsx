"use client";
import { useSession, signOut } from "next-auth/react";

export default function Profile() {
  return (
    <section className="profile wrapper container">
      <button className="sign-out-btn" onClick={() => signOut()}>
        Sign Out
      </button>
      <div className="profile-card">
        <h1 className="profile-title">Profile</h1>
      </div>
    </section>
  );
}
