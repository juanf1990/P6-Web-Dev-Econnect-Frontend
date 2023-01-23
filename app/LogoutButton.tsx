"use client";
import { signOut } from "next-auth/react";

function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="bg-cyan-400 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
    >
      Logout
    </button>
  );
}

export default LogoutButton;
