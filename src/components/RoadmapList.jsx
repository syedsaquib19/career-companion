import React, { useState } from "react";

export default function RoadmapList({ roadmap, setRoadmap }) {
  const [newTask, setNewTask] = useState("");

  const toggleTask = (weekIndex, task) => {
    setRoadmap((prev) => {
      const clone = [...prev];
      const w = clone[weekIndex];
      if (!w.completed) w.completed = [];

      if (w.completed.includes(task)) {
        w.completed = w.completed.filter((t) => t !== task);
      } else {
        w.completed = [...w.completed, task];
      }

      localStorage.setItem("cc_roadmap", JSON.stringify(clone));
      return clone;
    });
  };

  const addTask = (weekIndex) => {
    if (!newTask.trim()) return;
    setRoadmap((prev) => {
      const clone = [...prev];
      clone[weekIndex].tasks.push(newTask.trim());
      localStorage.setItem("cc_roadmap", JSON.stringify(clone));
      return clone;
    });
    setNewTask("");
  };

  const updateNotes = (weekIndex, text) => {
    setRoadmap((prev) => {
      const clone = [...prev];
      clone[weekIndex].notes = text;
      localStorage.setItem("cc_roadmap", JSON.stringify(clone));
      return clone;
    });
  };

  return (
    <div className="space-y-8">
      {roadmap.map((week, index) => (
        <section
          key={index}
          id={`week-${index}`}
          className="p-6 bg-slate-800/60 rounded-xl border border-slate-700"
        >
          <h2 className="text-xl font-bold mb-2">
            Week {index + 1}: {week.title}
          </h2>

          {week.objective && (
            <p className="text-slate-300 mb-4">{week.objective}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="space-y-3">
              <h3 className="font-semibold">Topics</h3>
              <ul className="list-disc ml-5 space-y-1 text-slate-300">
                {week.topics?.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>

              {week.subtopics && (
                <>
                  <h3 className="font-semibold mt-4">Subtopics</h3>
                  <ul className="list-disc ml-5 space-y-1 text-slate-300">
                    {week.subtopics.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Tasks</h3>
              <div className="space-y-2">
                {week.tasks?.map((t, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-2 text-slate-300"
                  >
                    <input
                      type="checkbox"
                      checked={week.completed?.includes(t)}
                      onChange={() => toggleTask(index, t)}
                      className="accent-blue-500"
                    />
                    {t}
                  </label>
                ))}
              </div>

              <div className="flex gap-2 mt-3">
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-700 rounded text-sm border border-slate-600"
                  placeholder="Add task"
                />
                <button
                  onClick={() => addTask(index)}
                  className="px-3 py-2 bg-blue-600 rounded text-sm"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-1">Resources</h3>
               <ul className="list-disc ml-5 space-y-1 text-blue-400 underline">
  {week.resources?.map((r, i) => (
    <li key={i}>
      <a href={r} target="_blank" rel="noreferrer">
        {r}
      </a>
    </li>
  ))}
</ul>
              </div>

              {week.videos && (
                <div>
                  <h3 className="font-semibold mb-1">Videos</h3>
                  <ul className="list-disc ml-5 space-y-1 text-blue-400 underline">
                    {week.videos.map((v, i) => (
                      <li key={i}>
                        <a href={v} target="_blank" rel="noreferrer">
                          {v}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <textarea
            rows="3"
            value={week.notes || ""}
            onChange={(e) => updateNotes(index, e.target.value)}
            className="w-full mt-5 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-sm"
            placeholder="Your notes for this week..."
          />
        </section>
      ))}
    </div>
  );
}
