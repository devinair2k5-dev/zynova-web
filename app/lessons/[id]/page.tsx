"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useUser from "@/lib/useUser";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

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

  // 📘 Fetch lesson
  useEffect(() => {
    if (!id) return;

    const fetchLesson = async () => {
      try {
        const ref = doc(db, "courses", id);
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
    return <div style={{ padding: 40 }}>Loading lesson…</div>;
  }

  if (!lesson) {
    return <div style={{ padding: 40 }}>Lesson not found ❌</div>;
  }

  return (
    <div style={{ padding: 40, maxWidth: 800, margin: "auto" }}>
      <h1>{lesson.title}</h1>
      <p>{lesson.description}</p>
      <hr />
      <div>{lesson.content}</div>
    </div>
  );
}