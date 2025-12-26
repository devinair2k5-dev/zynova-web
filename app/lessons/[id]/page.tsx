"use client";

import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import useUser from "@/lib/useUser";

export default function LessonPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, loading } = useUser();

  const [lesson, setLesson] = useState<any>(null);
  const [loadingLesson, setLoadingLesson] = useState(true);

  // 🔐 Protect route
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  // 📘 Fetch lesson
  useEffect(() => {
    const fetchLesson = async () => {
      const ref = doc(db, "courses", id as string);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setLesson(snap.data());
      }
      setLoadingLesson(false);
    };

    fetchLesson();
  }, [id]);

  if (loading || loadingLesson) return null;

  if (!lesson) {
    return (
      <div style={box}>
        <h2>Lesson not found</h2>
      </div>
    );
  }

  return (
    <div style={box}>
      <h2>{lesson.title}</h2>
      <p>{lesson.description}</p>

      <p style={{ marginTop: 20 }}>
        <strong>Type:</strong> {lesson.type}
      </p>

      <button style={btn} onClick={() => router.back()}>
        ← Back to Dashboard
      </button>
    </div>
  );
}

/* 🎨 Styles */

const box = {
  width: 500,
  margin: "80px auto",
  background: "#111",
  color: "white",
  padding: 20,
  borderRadius: 8,
};

const btn = {
  marginTop: 20,
  padding: 10,
  cursor: "pointer",
};