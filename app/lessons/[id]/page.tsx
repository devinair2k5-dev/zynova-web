'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import useUser from '@/lib/useUser';

export default function LessonPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, loading } = useUser();
  const [lesson, setLesson] = useState<any>(null);

  useEffect(() => {
    if (!loading && !user) router.replace('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (!id) return;

    const loadLesson = async () => {
      const { db } = await import('@/lib/firebase');
      const { doc, getDoc } = await import('firebase/firestore');

      const snap = await getDoc(doc(db, 'courses', id as string));
      if (snap.exists()) setLesson(snap.data());
    };

    loadLesson();
  }, [id]);

  if (!lesson) return <div>Loading...</div>;

  return <div>{lesson.title}</div>;
}