import React from "react";

export default function RoadmapCard({ week, index, updateWeek }) {
  return (
    <div
      id={`week-${index}`}
      className="mb-6 p-5 bg-slate-800/50 rounded-xl border border-slate-700"
    >
      <h2 className="text-xl font-semibold mb-3">
        Week {index + 1}: {week.title}
      </h2>

      {week.objective && (
        <p className="text-slate-300 text-sm mb-3">{week.objective}</p>
      )}

      <div className="mb-4">
        <h3 className="font-medium mb-1 text-slate-400">Topics</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          {week.topics?.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-1 text-slate-400">Tasks</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          {week.tasks?.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>

      <textarea
        placeholder="Notes..."
        value={week.notes || ""}
        onChange={(e) => updateWeek(index, { notes: e.target.value })}
        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-sm"
      />
    </div>
  );
}
