// src/utils/generator.js

import python from "../data/roadmaps/python.json";
import webdev from "../data/roadmaps/webdev.json";

const datasets = {
  python,
  webdev
};

export function generateRoadmap(form) {
  if (!form) return [];

  const { career, skill, hours, modes, goals } = form;
  const dataset = datasets[career];
  if (!dataset) return [];

  const base = dataset[skill] || [];
  if (!Array.isArray(base)) return [];

  const h = Math.max(1, Number(hours) || 5);
  const multiplier =
    h >= 12 ? 0.9 :
    h >= 8  ? 1.0 :
    h >= 5  ? 1.1 : 1.3;

  const roadmap = base.map((w, i) => ({
    id: `week-${i + 1}`,
    title: w.title || `Week ${i + 1}`,
    objective: w.objective || "",
    topics: w.topics || [],
    subtopics: w.subtopics || [],
    tasks: w.tasks || [],
    practice: w.practice || [],
    projects: w.projects || [],
    resources: w.resources || [],
    videos: w.videos || [],
    quiz: w.quiz || [],
    time: Math.max(1, Math.round((w.time || 4) * multiplier)),
    completed: [],
    notes: ""
  }));

  if (goals && roadmap.length > 0) {
    roadmap[0].tasks.unshift(`Personal Goal: ${goals}`);
    roadmap[0].topics.unshift("Goal Setup");
  }

  if (modes?.includes("practice")) {
    roadmap.forEach((w) => {
      if (!w.practice.length) {
        w.practice.push("Practice: Apply this week's learning through a task.");
      }
    });
  }

  return roadmap;
}
