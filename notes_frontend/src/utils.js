const NOTES_STORAGE_KEY = "notes_app_notes_v1";

/* Helpers for localStorage persistence */

// PUBLIC_INTERFACE
export function loadNotes() {
  /** Loads all notes from localStorage (mock backend). Returns [] if none. */
  try {
    const raw = localStorage.getItem(NOTES_STORAGE_KEY);
    if (!raw) return [];
    const notes = JSON.parse(raw);
    if (Array.isArray(notes)) return notes;
    return [];
  } catch {
    return [];
  }
}

// PUBLIC_INTERFACE
export function saveNotes(notes) {
  /** Persists notes array to localStorage. */
  localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
}

// PUBLIC_INTERFACE
export function generateNoteId() {
  /** Generates a simple string note ID. */
  return "note_" + Date.now() + "_" + Math.random().toString(36).slice(2, 7);
}

// PUBLIC_INTERFACE
export function sortNotes(notes) {
  /** Returns notes sorted by updated desc, then title. */
  return [...notes].sort((a, b) => {
    const aTime = a.updated || a.created || 0, bTime = b.updated || b.created || 0;
    if (bTime !== aTime) return bTime - aTime;
    return (a.title || "").localeCompare(b.title || "");
  });
}

// PUBLIC_INTERFACE
export function extractFolders(notes) {
  /** Unique list of all folders (non-empty) in notes. */
  return [
    ...new Set(notes.map(n => n.folder).filter(Boolean))
  ].sort();
}

// PUBLIC_INTERFACE
export function extractTags(notes) {
  /** Unique list of all tags in notes. */
  const tagSet = new Set();
  notes.forEach(note => (note.tags || []).forEach(tag => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

// PUBLIC_INTERFACE
export function filterNotes({ notes, folder, tag, search }) {
  /** Filters notes by optionally folder, tag, search term. */
  let filtered = [...notes];
  if (folder) filtered = filtered.filter(n => n.folder === folder);
  if (tag) filtered = filtered.filter(n => (n.tags || []).includes(tag));
  if (search) {
    const query = search.toLowerCase();
    filtered = filtered.filter(
      n =>
        (n.title?.toLowerCase().includes(query) ||
          n.content?.toLowerCase().includes(query) ||
          (n.folder?.toLowerCase().includes(query)) ||
          (n.tags || []).some(t => t.toLowerCase().includes(query)))
    );
  }
  return filtered;
}
