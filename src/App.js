import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RoadmapPage from "./pages/RoadmapPage";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <main className="w-full px-6 py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
        </Routes>
      </main>
    </div>
  );
}
