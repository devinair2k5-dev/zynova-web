"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { signOut } from "firebase/auth";

import { db, auth } from "@/lib/firebase";
import useUser from "@/lib/useUser";

export default function AdminDashboard() {
  const { user, role, loading } = useUser();
  const router = useRouter();

  const [courses, setCourses] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Lesson");
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading) {
      if (!user) router.replace("/login");
      else if (role !== "admin") router.replace("/dashboard");
    }
  }, [user, role, loading, router]);

  const fetchCourses = async () => {
    const snap = await getDocs(collection(db, "courses"));
    setCourses(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const saveCourse = async () => {
    if (!title || !description) return;

    if (editId) {
      await updateDoc(doc(db, "courses", editId), {
        title,
        description,
        type,
      });
    } else {
      await addDoc(collection(db, "courses"), {
        title,
        description,
        type,
        createdAt: serverTimestamp(),
      });
    }

    setTitle("");
    setDescription("");
    setType("Lesson");
    setEditId(null);
    fetchCourses();
  };

  const editCourse = (c: any) => {
    setEditId(c.id);
    setTitle(c.title);
    setDescription(c.description);
    setType(c.type);
  };

  const deleteCourse = async (id: string) => {
    await deleteDoc(doc(db, "courses", id));
    fetchCourses();
  };

  // 🚪 LOGOUT FUNCTION
  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/login");
  };

  if (loading) return null;

  return (
    <div style={box}>
      <h2>Admin Dashboard</h2>
      <p>{user?.email}</p>

      <button onClick={handleLogout} style={logoutBtn}>
        Logout
      </button>

      <h3>Create / Edit Lesson</h3>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={input}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={input}
      />

      <select value={type} onChange={(e) => setType(e.target.value)} style={input}>
        <option value="Lesson">Lesson</option>
        <option value="Video">Video</option>
        <option value="PDF">PDF</option>
      </select>

      <button onClick={saveCourse} style={btn}>
        {editId ? "Update Lesson" : "Create Lesson"}
      </button>

      <hr />

      {courses.map(c => (
        <div key={c.id} style={card}>
          <h4>{c.title}</h4>
          <p>{c.description}</p>
          <small>{c.type}</small>
          <br />
          <button onClick={() => editCourse(c)}>Edit</button>
          <button onClick={() => deleteCourse(c.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

/* styles */

const box = {
  width: 420,
  margin: "60px auto",
};

const input = {
  width: "100%",
  marginBottom: 8,
  padding: 8,
};

const btn = {
  width: "100%",
  padding: 10,
};

const card = {
  background: "#111",
  color: "white",
  padding: 10,
  marginTop: 10,
  borderRadius: 6,
};

const logoutBtn = {
  marginBottom: 15,
  padding: 8,
};
