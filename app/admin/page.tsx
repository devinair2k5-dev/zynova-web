"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useUser from "@/lib/useUser";

export default function AdminDashboard() {
  const { user, role, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
    } else if (role !== "admin") {
      router.replace("/dashboard");
    }
  }, [user, role, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="mt-2 text-gray-600">
        Welcome Admin 👑
      </p>
    </div>
  );
}