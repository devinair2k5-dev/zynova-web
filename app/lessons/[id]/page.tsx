'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../../lib/firebase';

export default function LessonPage() {
  const { id } = useParams();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔒 Protect route
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.replace('/login');
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });

    return () => unsub();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-400 to-blue-600">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[360px] text-center">
        <h1 className="text-xl font-bold text-blue-600 mb-2">
          Lesson {id}
        </h1>

        <p className="text-gray-600 mb-4">
          Welcome, {user?.email}
        </p>

        <button
          onClick={() => router.push('/dashboard')}
          className="w-full bg-blue-600 text-white py-2 rounded font-semibold"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}