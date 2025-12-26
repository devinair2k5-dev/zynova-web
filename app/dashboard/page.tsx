"use client";

import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import useUser from "@/lib/useUser";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  if (loading || !user) return null;

  const progress = 40; // TEMP demo value

  return (
    <div style={page}>
      {/* HEADER */}
      <header style={header}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img src="/logo.png" alt="Zynova" style={{ width: 42 }} />
          <div>
            <strong>Zynova</strong>
            <div style={{ fontSize: 12, opacity: 0.8 }}>
              Student Dashboard
            </div>
          </div>
        </div>

        <button style={logoutBtn} onClick={() => signOut(auth)}>
          Logout
        </button>
      </header>

      {/* CONTENT */}
      <div style={content}>
        {/* STREAK */}
        <div style={card}>
          <h3>🔥 Daily Streak</h3>
          <p>7 days learning streak</p>
        </div>

        {/* PROGRESS */}
        <div style={card}>
          <h3>📊 Learning Progress</h3>
          <div style={progressBg}>
            <div style={{ ...progressFill, width: `${progress}%` }} />
          </div>
          <p>{progress}% completed</p>
        </div>

        {/* BADGES */}
        <div style={card}>
          <h3>🏆 Achievements</h3>

          <div style={badgeGrid}>
            <Badge title="Bravo Learner" color="#4caf50" />
            <Badge title="Rising Scholar" color="#2196f3" />
            <Badge title="Concept Master" color="#ff9800" />
            <LockedBadge title="Gold Scholar" />
            <LockedBadge title="Platinum Performer" />
          </div>
        </div>

        {/* PARENT VIEW */}
        <div style={card}>
          <h3>👨‍👩‍👧 Parent Summary</h3>
          <p>Attendance: Good</p>
          <p>Consistency: High</p>
        </div>

        {/* LESSONS */}
        <div style={card}>
          <h3>📚 Available Lessons</h3>

          <div style={lessonCard}>
            <strong>Maths – Fractions</strong>
            <p>Introduction to fractions</p>
            <button
              style={openBtn}
              onClick={() => router.push("/lessons/1")}
            >
              Open Lesson →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- BADGE COMPONENTS ---------------- */

function Badge({ title, color }: { title: string; color: string }) {
  return (
    <div style={{ ...badge, borderColor: color }}>
      <strong>{title}</strong>
      <span style={{ color }}>Unlocked</span>
    </div>
  );
}

function LockedBadge({ title }: { title: string }) {
  return (
    <div style={{ ...badge, opacity: 0.5 }}>
      <strong>{title}</strong>
      <span>🔒 Locked</span>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const page = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#2193b0,#6dd5ed)",
  color: "white",
};

const header = {
  padding: 16,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "rgba(0,0,0,0.25)",
};

const logoutBtn = {
  background: "#e53935",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: 6,
  cursor: "pointer",
};

const content = {
  padding: 24,
  display: "grid",
  gap: 16,
  maxWidth: 900,
  margin: "0 auto",
};

const card = {
  background: "rgba(0,0,0,0.35)",
  padding: 16,
  borderRadius: 12,
};

const progressBg = {
  height: 12,
  background: "#333",
  borderRadius: 6,
  overflow: "hidden",
  marginTop: 8,
};

const progressFill = {
  height: "100%",
  background: "#00e676",
};

const badgeGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
  gap: 12,
  marginTop: 12,
};

const badge = {
  background: "#111",
  border: "2px solid",
  borderRadius: 10,
  padding: 12,
  textAlign: "center" as const,
};

const lessonCard = {
  marginTop: 10,
  padding: 12,
  background: "#111",
  borderRadius: 10,
};

const openBtn = {
  marginTop: 8,
  padding: "6px 10px",
  background: "#00e5ff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};