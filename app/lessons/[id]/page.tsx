"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useUser from "@/lib/useUser";

type Lesson = {
  title: string;
  description: string;
  content: string;
};

export default function LessonPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const { user, loading } = useUser();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loadingLesson, setLoadingLesson] = useState(true);

  // 🔐 Protect route
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  // 📘 Fetch lesson (CLIENT ONLY)
  useEffect(() => {
    if (!id) return;

    const fetchLesson = async () => {
      try {
        // ⛔ Import firebase ONLY on client
        const { doc, getDoc } = await import("firebase/firestore");
        const { db } = await import("@/lib/firebase");

        if (!db) return;

        const ref = doc(db, "lessons", id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setLesson(snap.data() as Lesson);
        }
      } catch (err) {
        console.error("Lesson fetch error:", err);
      } finally {
        setLoadingLesson(false);
      }
    };

    fetchLesson();
  }, [id]);

  if (loading || loadingLesson) {
    return <div className="p-6 text-white">Loading lesson...</div>;
  }

  if (!lesson) {
    return <div className="p-6 text-white">Lesson not found</div>;
  }

  return (
    <div className="min-h-screen p-6 text-white">
      <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
      <p className="text-gray-300 mb-4">{lesson.description}</p>
      <div className="bg-white/10 p-4 rounded-lg">
        {lesson.content}
      </div>
    </div>
  );
}