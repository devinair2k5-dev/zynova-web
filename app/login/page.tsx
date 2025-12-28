"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import useUser from "@/lib/useUser";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 🚫 Prevent SSR crash
  if (typeof window === "undefined") return null;

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  const handleEmailSignup = async () => {
    setError("");
    try {
      if (!auth) return;
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      if (!auth) return;
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading || user) return null;

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#5fd3ff",
      }}
    >
      <div
        style={{
          background: "#111",
          padding: 30,
          borderRadius: 12,
          width: 320,
          color: "white",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>Zynova</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <button
          onClick={handleEmailSignup}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 10,
            cursor: "pointer",
          }}
        >
          Create Student Account
        </button>

        <button
          onClick={handleGoogleLogin}
          style={{
            width: "100%",
            padding: 10,
            background: "#e57373",
            color: "white",
            cursor: "pointer",
          }}
        >
          Sign in with Google
        </button>

        {error && (
          <p style={{ marginTop: 10, color: "#ff8a80", fontSize: 12 }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}