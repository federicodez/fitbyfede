import { WorkoutSession } from "@/types";
import React, { useState, useEffect, useRef } from "react";

type SessionNotesProps = {
  session: WorkoutSession;
  sessionNotes: string;
  setSessionNotes: React.Dispatch<React.SetStateAction<string>>;
  isSessionNotesOpen: boolean;
  setIsSessionNotesOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SessionNotes = ({
  session,
  sessionNotes,
  setSessionNotes,
  isSessionNotesOpen,
  setIsSessionNotesOpen,
}: SessionNotesProps) => {
  const noteRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isSessionNotesOpen) return;
    const checkIfClickedOutside = (e: MouseEvent | TouchEvent) => {
      if (
        noteRef?.current &&
        !noteRef?.current?.contains(e.target as HTMLElement)
      ) {
        setIsSessionNotesOpen(false);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [noteRef, isSessionNotesOpen, setIsSessionNotesOpen]);
  return isSessionNotesOpen ? (
    <div ref={noteRef}>
      <input
        value={sessionNotes}
        type="text"
        placeholder={session?.notes || ""}
        className="text-black bg-white rounded-md w-full"
        onChange={(e) => setSessionNotes(e.target.value)}
      />
    </div>
  ) : (
    <div role="button" onClick={() => setIsSessionNotesOpen(true)}>
      {sessionNotes ? (
        sessionNotes
      ) : session?.notes ? (
        session.notes
      ) : (
        <div className="opacity-50">Notes</div>
      )}
    </div>
  );
};

export default SessionNotes;
