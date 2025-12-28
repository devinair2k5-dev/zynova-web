"use client";

import { useRouter } from "next/navigation";
import useUser from "@/lib/useUser";

export default function AdminPage() {
  const { user, role, loading } = useUser();
  const router = useRouter();

  if (typeof window === "undefined") return null;
  if (loading) return null;

  if (!user || role !== "admin") {
    router.replace("/login");
    return null;
  }

  return <h1>Admin Dashboard</h1>;
}