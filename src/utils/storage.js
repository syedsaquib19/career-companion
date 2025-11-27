// ---- Storage Keys ---- //
const CURRENT_KEY = "cc_current";
const ALL_SAVED_KEY = "cc_saved";
const FORM_KEY = "cc_form";

// ---- Save current roadmap ---- //
export function saveRoadmapToStorage(roadmap) {
  try {
    localStorage.setItem(CURRENT_KEY, JSON.stringify(roadmap));
  } catch (e) {
    console.error("Save current roadmap failed:", e);
  }
}

// ---- Load current roadmap ---- //
export function loadRoadmapFromStorage() {
  try {
    const raw = localStorage.getItem(CURRENT_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error("Load current roadmap failed:", e);
    return null;
  }
}

// ---- Save all roadmaps (named) ---- //
export function saveAllRoadmapsToStorage(obj) {
  try {
    localStorage.setItem(ALL_SAVED_KEY, JSON.stringify(obj));
  } catch (e) {
    console.error("Save all failed:", e);
  }
}

// ---- Load all saved roadmaps ---- //
export function loadAllRoadmapsFromStorage() {
  try {
    const raw = localStorage.getItem(ALL_SAVED_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error("Load all failed:", e);
    return {};
  }
}

// ---- Save last used form (for prefill) ---- //
export function saveFormToStorage(form) {
  try {
    localStorage.setItem(FORM_KEY, JSON.stringify(form));
  } catch (e) {
    console.error("Save form failed:", e);
  }
}

// ---- Load last form ---- //
export function loadFormFromStorage() {
  try {
    const raw = localStorage.getItem(FORM_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error("Load form failed:", e);
    return null;
  }
}
