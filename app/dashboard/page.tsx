'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/login');
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    });

    return () => unsub();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-100 text-gray-800">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-400 to-blue-600">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-[340px] text-gray-800">
        
        <h1 className="text-xl font-bold text-blue-700 mb-2 text-center">
          Student Dashboard
        </h1>

        <p className="text-sm text-gray-700 mb-4 text-center">
          Welcome, <span className="font-semibold">{user?.email}</span>
        </p>

        <button
          onClick={async () => {
            await signOut(auth);
            router.push('/login');
          }}
          className="w-full rounded bg-red-500 py-2 font-semibold text-white hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
}