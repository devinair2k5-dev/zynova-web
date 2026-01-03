'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const login = async () => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (e: any) {
      setError(e.message);
    }
  };

  const signup = async () => {
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (e: any) {
      setError(e.message);
    }
  };

  const googleLogin = async () => {
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/dashboard');
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-400 to-blue-600">
      <div className="w-[360px] rounded-2xl bg-white p-6 shadow-xl flex flex-col gap-3 text-gray-800">

        <h1 className="text-center text-2xl font-bold text-blue-700">
          Zynova
        </h1>

        <input
          className="w-full rounded border px-3 py-2 text-gray-800"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full rounded border px-3 py-2 text-gray-800"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-sm text-center text-red-500">{error}</p>
        )}

        <button
          onClick={login}
          className="w-full rounded bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Login
        </button>

        <button
          onClick={signup}
          className="w-full rounded bg-gray-200 py-2 font-semibold text-gray-800 hover:bg-gray-300"
        >
          Create Student Account
        </button>

        <button
          onClick={googleLogin}
          className="w-full rounded bg-red-500 py-2 font-semibold text-white hover:bg-red-600"
        >
          Sign in with Google
        </button>

      </div>
    </div>
  );
}