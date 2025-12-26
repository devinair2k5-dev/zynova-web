"use client";

export default function FloatingObjects() {
  return (
    <div className="floating-container">
      {/* 📘 Education */}
      <span className="float book">📚</span>
      <span className="float pencil">✏️</span>
      <span className="float ruler">📐</span>

      {/* 🧪 Chemistry */}
      <span className="float flask">🧪</span>
      <span className="float testtube">🧫</span>

      {/* ⚛️ Physics */}
      <span className="float atom">⚛️</span>
      <span className="float magnet">🧲</span>
      <span className="float bulb">💡</span>

      {/* 🧬 Biology */}
      <span className="float dna">🧬</span>
      <span className="float leaf">🍃</span>
      <span className="float microscope">🔬</span>

      {/* 🌍 Fun learning */}
      <span className="float globe">🌍</span>
      <span className="float star">⭐</span>
    </div>
  );
}