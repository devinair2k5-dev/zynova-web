'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const emailLogin = async () => {
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const googleLogin = async () => {
    setError('');
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    await signInWithRedirect(auth, provider);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-400 to-blue-600">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[340px]">
        <h1 className="text-xl font-bold text-center text-blue-700 mb-4">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-3 py-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 px-3 py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
        )}

        <button
          onClick={emailLogin}
          className="w-full bg-blue-600 text-white py-2 rounded mb-3 hover:bg-blue-700"
        >
          Login
        </button>

        <button
          onClick={googleLogin}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}