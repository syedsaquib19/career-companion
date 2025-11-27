import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateRoadmap } from "../utils/generator";

export default function HomePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    career: "",
    skill: "beginner",
    hours: 6,
    modes: ["video"],
    goals: "",
  });

  const toggleMode = (mode) => {
    setForm((prev) =>
      prev.modes.includes(mode)
        ? { ...prev, modes: prev.modes.filter((m) => m !== mode) }
        : { ...prev, modes: [...prev.modes, mode] }
    );
  };

  const submit = (e) => {
    e.preventDefault();

    if (!form.career) {
      alert("Please select a career path.");
      return;
    }

    const payload = {
      career: form.career,
      skill: form.skill,
      hours: Number(form.hours) || 6,
      modes: form.modes,
      goals: form.goals || "",
    };

    let roadmap;
    try {
      roadmap = generateRoadmap(payload);
    } catch (err) {
      console.error("Roadmap generation failed:", err);
      alert("Generation failed. Check console.");
      return;
    }

    localStorage.setItem("cc_current", JSON.stringify(roadmap));
    localStorage.setItem("cc_form", JSON.stringify(form));

    navigate("/roadmap", { state: { roadmap } });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 antialiased">
      {/* NAVBAR */}
      <header className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-xl">
              CC
            </div>
            <span className="text-xl font-semibold">Career Companion</span>
          </div>

          <a
            href="#form-section"
            className="px-4 py-2 rounded bg-white text-slate-900 font-semibold hover:bg-slate-200 transition"
          >
            Generate Roadmap
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-24 pb-20 text-center max-w-4xl mx-auto px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Personalized Learning Roadmaps
          <br />
          <span className="text-blue-400">Designed For Your Career.</span>
        </h1>

        <p className="text-slate-400 text-lg mt-6">
          “A simple way to organize your learning journey.
          <br />
          Know exactly what to learn next.”
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#form-section"
            className="px-6 py-3 text-lg rounded bg-white text-slate-900 font-semibold hover:bg-slate-200 transition"
          >
            Start Your Journey
          </a>

          <a
            href="#features"
            className="px-6 py-3 text-lg rounded border border-slate-700 hover:bg-slate-800 transition"
          >
            Explore Features
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">Why Career Companion?</h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Smart Weekly Plans</h3>
              <p className="text-slate-400">
                Auto-generated week-by-week steps tailored to your skill level
                and hours.
              </p>
            </div>

            <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
              <div className="text-3xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold mb-2">AI-Personalized</h3>
              <p className="text-slate-400">
                Adjusts to your goals, mode of learning and preferred pacing.
              </p>
            </div>

            <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
              <div className="text-3xl mb-4">⏱️</div>
              <h3 className="text-xl font-semibold mb-2">Save Time</h3>
              <p className="text-slate-400">
                Stop searching “what to learn next” — get instant clarity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="form-section" className="py-20 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Build Your Custom Roadmap
          </h2>

          <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl">
            <form
              onSubmit={submit}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* 1: Career path & skill */}
              <div>
                <label className="text-sm text-slate-300">Select Path</label>
                <select
                  value={form.career}
                  onChange={(e) => setForm({ ...form, career: e.target.value })}
                  className="mt-2 w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg"
                  required
                >
                  <option value="">Select career</option>
                  <option value="python">Python Developer</option>
                  <option value="webdev">Web Developer</option>
                </select>

                <label className="text-sm text-slate-300 block mt-4">
                  Skill Level
                </label>
                <div className="flex gap-3 mt-2">
                  {["beginner", "intermediate", "advanced"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm({ ...form, skill: s })}
                      className={`px-3 py-2 rounded-lg text-sm ${
                        form.skill === s
                          ? "bg-blue-600 text-white"
                          : "bg-slate-900 border border-slate-700"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2: Hours & modes */}
              <div>
                <label className="text-sm text-slate-300">Hours per Week</label>
                <input
                  type="number"
                  min="1"
                  value={form.hours}
                  onChange={(e) =>
                    setForm({ ...form, hours: Number(e.target.value) })
                  }
                  className="mt-2 w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg"
                />

                <label className="text-sm text-slate-300 block mt-4">
                  Modes
                </label>
                <div className="flex gap-3 mt-2">
                  {["video", "text", "practice"].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => toggleMode(m)}
                      className={`px-3 py-2 rounded-lg text-sm ${
                        form.modes.includes(m)
                          ? "bg-blue-600 text-white"
                          : "bg-slate-900 border border-slate-700"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3: Goals + submit */}
              <div>
                <label className="text-sm text-slate-300">Goals (optional)</label>
                <textarea
                  rows="4"
                  value={form.goals}
                  onChange={(e) =>
                    setForm({ ...form, goals: e.target.value })
                  }
                  className="mt-2 w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg"
                />

                <div className="flex gap-3 mt-4">
                  <button
                    type="submit"
                    className="px-4 py-3 bg-white text-slate-900 rounded font-semibold"
                  >
                    Generate
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        career: "",
                        skill: "beginner",
                        hours: 6,
                        modes: ["video"],
                        goals: "",
                      })
                    }
                    className="px-4 py-3 border border-slate-700 rounded"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-slate-800 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} Career Companion · Built by Syed Saquib
      </footer>
    </div>
  );
}
