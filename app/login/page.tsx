"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider, db } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import useUser from "@/lib/useUser";
import FloatingObjects from "@/app/components/FloatingObjects";

export default function LoginPage() {
  const router = useRouter();
  const { user, role, loading } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");

  // 🔁 Redirect after login
  useEffect(() => {
    if (!loading && user) {
      if (role === "admin") router.replace("/admin");
      else router.replace("/dashboard");
    }
  }, [user, role, loading, router]);

  if (loading || user) return null;

  // 👩‍🎓 Create student account
  async function createStudent() {
    setMsg("");

    if (!email || !password) {
      setMsg("Email and password required");
      return;
    }

    if (password.length < 6) {
      setMsg("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", res.user.uid), {
        email,
        role: "student",
        createdAt: serverTimestamp(),
      });

      setMsg("Account created successfully");
    } catch (err: any) {
      setMsg(err.message);
    }
  }

  // 🔵 Google login
  async function googleLogin() {
    setMsg("");
    try {
      const res = await signInWithPopup(auth, googleProvider);

      const ref = doc(db, "users", res.user.uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        await setDoc(ref, {
          email: res.user.email,
          role: "student",
          createdAt: serverTimestamp(),
        });
      }
    } catch (err: any) {
      setMsg(err.message);
    }
  }

  return (
    <div style={pageStyle}>
      {/* 🌈 Floating background */}
      <FloatingObjects />

      {/* 🔐 Login Card */}
      <div style={cardStyle}>
        {/* 🖼️ LOGO */}
        <img
          src="/logo.png"
          alt="Zynova Logo"
          style={{
            width: 120,
            marginBottom: 10,
          }}
        />

        <div style={tagline}>Smart Learning for Students</div>

        {/* ✉️ Email */}
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        {/* 🔒 Password */}
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={eyeStyle}
          >
            {showPassword ? "🙈" : "👁"}
          </span>
        </div>

        {/* 🆕 Create account */}
        <button style={btnStyle} onClick={createStudent}>
          Create Student Account
        </button>

        {/* 🔵 Google login */}
        <button style={googleBtn} onClick={googleLogin}>
          Sign in with Google
        </button>

        {msg && <p style={{ marginTop: 10 }}>{msg}</p>}
      </div>
    </div>
  );
}

/* 🎨 Styles */

const pageStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#2193b0,#6dd5ed)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative" as const,
};

const cardStyle = {
  background: "rgba(17,17,17,0.95)",
  color: "white",
  padding: 28,
  width: 340,
  borderRadius: 16,
  textAlign: "center" as const,
  zIndex: 1,
  boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
};

const tagline = {
  fontSize: 14,
  marginBottom: 18,
  opacity: 0.85,
};

const inputStyle = {
  width: "100%",
  padding: 10,
  marginBottom: 12,
  borderRadius: 6,
  border: "none",
};

const btnStyle = {
  width: "100%",
  padding: 10,
  marginBottom: 10,
  cursor: "pointer",
  borderRadius: 6,
  border: "none",
};

const googleBtn = {
  width: "100%",
  padding: 10,
  background: "#db4437",
  color: "white",
  cursor: "pointer",
  borderRadius: 6,
  border: "none",
};

const eyeStyle = {
  position: "absolute" as const,
  right: 10,
  top: 12,
  cursor: "pointer",
};
cd