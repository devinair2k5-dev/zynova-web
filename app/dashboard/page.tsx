"use client";

import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import useUser from "@/lib/useUser";
import { auth } from "@/lib/firebase";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useUser();

  // 🚫 Stop Next.js from touching this during build
  if (typeof window === "undefined") return null;
  if (loading) return null;
  if (!user) {
    router.replace("/login");
    return null;
  }

  const handleLogout = async () => {
    if (!auth) return;
    await signOut(auth);
    router.replace("/login");
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Student Dashboard</h1>
      <p>Welcome, {user.email}</p>

      <button onClick={handleLogout} style={{ marginTop: 20 }}>
        Logout
      </button>
    </div>
  );
}