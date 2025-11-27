import React, { useEffect, useState } from "react";
import { generateRoadmap } from "../utils/generator";
import RoadmapList from "../components/RoadmapList";
import {
  saveAllRoadmapsToStorage,
  loadAllRoadmapsFromStorage,
  saveRoadmapToStorage,
} from "../utils/storage";
import jsPDF from "jspdf";

export default function RoadmapPage() {
  const savedForm = JSON.parse(localStorage.getItem("cc_form") || "null");
  const [form] = useState(savedForm || null);

  const [roadmap, setRoadmap] = useState([]);
  const [nameForPDF, setNameForPDF] = useState("");
  const [allSaved, setAllSaved] = useState(loadAllRoadmapsFromStorage() || {});

  // Prevent auto-scroll to bottom on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    if (form) {
      const generated = generateRoadmap(form);
      setRoadmap(generated);
      saveRoadmapToStorage(generated);
    }
  }, [form]);

  const totalWeeks = roadmap.length;
  const totalHours = roadmap.reduce((s, w) => s + (w.time || 0), 0);
  const totalTasks = roadmap.reduce((s, w) => s + (w.tasks?.length || 0), 0);
  const completedTasks = roadmap.reduce(
    (s, w) => s + (w.completed?.length || 0),
    0
  );
  const progress = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleSaveAs = () => {
    const key = prompt("Name this roadmap:");
    if (!key) return;

    const obj = {
      meta: { savedAt: new Date().toISOString(), title: key, form },
      roadmap,
    };

    const next = { ...allSaved, [key]: obj };
    saveAllRoadmapsToStorage(next);
    setAllSaved(next);
  };

  // FIXED — proper multipage PDF
  const handleExportPDF = () => {
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    let y = 40;

    doc.setFontSize(22);
    doc.text("Career Companion — Roadmap", 40, y);
    y += 30;

    if (nameForPDF) {
      doc.setFontSize(12);
      doc.text(`Name: ${nameForPDF}`, 40, y);
      y += 20;
    }

    if (form) {
      doc.text(`${form.career} — ${form.skill}`, 40, y);
      y += 30;
    }

    roadmap.forEach((wk, i) => {
      if (y > 730) {
        doc.addPage();
        y = 40;
      }

      doc.setFontSize(16);
      doc.text(`Week ${i + 1}: ${wk.title}`, 40, y);
      y += 20;

      doc.setFontSize(11);
      wk.topics?.forEach((t) => {
        if (y > 750) {
          doc.addPage();
          y = 40;
        }
        doc.text(`• ${t}`, 60, y);
        y += 14;
      });

      y += 10;
    });

    doc.save("roadmap.pdf");
  };

  const handleLoad = (key) => {
    const obj = allSaved[key];
    if (!obj) return;
    setRoadmap(obj.roadmap);
    saveRoadmapToStorage(obj.roadmap);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 px-6 py-8">
      <div className="flex gap-6">

        {/* LEFT WEEK PANEL */}
        <aside className="w-48 bg-slate-800/50 p-4 rounded-lg border border-slate-700 sticky top-4 h-fit">
          <h3 className="font-semibold text-sm mb-3">Weeks</h3>

          <div className="space-y-2">
            {roadmap.map((_, index) => (
              <button
                key={index}
                className="w-full py-2 px-3 bg-slate-700/70 hover:bg-slate-600 rounded text-left text-sm"
                onClick={() => {
                  const el = document.getElementById(`week-${index}`);
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
              >
                Week {index + 1}
              </button>
            ))}
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Your Roadmap</h1>
              <p className="text-slate-400 text-sm">
                {form?.career?.replace("_", " ")} • {form?.skill}
              </p>
            </div>

            <div className="flex gap-2">
              <input
                className="px-3 py-2 bg-slate-800 rounded border border-slate-700 text-sm"
                placeholder="Your Name (PDF)"
                value={nameForPDF}
                onChange={(e) => setNameForPDF(e.target.value)}
              />

              <button
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                onClick={handleExportPDF}
              >
                Export PDF
              </button>
            </div>
          </div>

          {/* SUMMARY CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-slate-800/50 rounded border border-slate-700">
              <div className="text-xs text-slate-400">Weeks</div>
              <div className="text-xl font-bold">{totalWeeks}</div>
            </div>

            <div className="p-4 bg-slate-800/50 rounded border border-slate-700">
              <div className="text-xs text-slate-400">Estimated Hours</div>
              <div className="text-xl font-bold">{totalHours} hrs</div>
            </div>

            <div className="p-4 bg-slate-800/50 rounded border border-slate-700">
              <div className="text-xs text-slate-400">Progress</div>
              <div className="text-xl font-bold">{progress}%</div>
            </div>
          </div>

          <RoadmapList roadmap={roadmap} setRoadmap={setRoadmap} />
        </main>

        {/* RIGHT PANEL */}
        <aside className="w-72 space-y-6">
          <div className="p-4 bg-slate-800/50 rounded border border-slate-700">
            <h3 className="font-semibold mb-2">Saved Roadmaps</h3>

            {Object.keys(allSaved).length === 0 ? (
              <div className="text-xs text-slate-400">No saved roadmaps</div>
            ) : (
              <div className="space-y-2">
                {Object.keys(allSaved).map((key) => (
                  <button
                    key={key}
                    className="w-full py-2 px-3 bg-slate-700/60 hover:bg-slate-600 rounded text-left text-sm"
                    onClick={() => handleLoad(key)}
                  >
                    {key}
                  </button>
                ))}
              </div>
            )}

            <button
              className="mt-3 w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm"
              onClick={handleSaveAs}
            >
              Save Current
            </button>
          </div>

          <div className="p-4 bg-slate-800/50 rounded border border-slate-700 space-y-2">
            <h3 className="font-semibold mb-2">Quick Actions</h3>

            <button
              onClick={() => {
                setRoadmap([]);
                localStorage.removeItem("cc_current");
              }}
              className="w-full py-2 bg-red-600/80 hover:bg-red-700 rounded text-sm"
            >
              Clear Current
            </button>

            <button
              onClick={() => {
                const g = generateRoadmap(form);
                setRoadmap(g);
                saveRoadmapToStorage(g);
              }}
              className="w-full py-2 bg-yellow-500/80 hover:bg-yellow-600 rounded text-sm"
            >
              Regenerate
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
