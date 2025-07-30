import React from "react";

// PUBLIC_INTERFACE
function NotesList({ notes, onSelectNote, onEditNote, onDeleteNote, selectedNoteId }) {
  /** Displays a list of notes with title, tags/folder, and action buttons. */
  if (!notes.length) {
    return <div className="notes-list empty">No notes found.</div>;
  }
  return (
    <div className="notes-list">
      {notes.map(note => (
        <div
          key={note.id}
          className={
            "note-list-item" +
            (note.id === selectedNoteId ? " selected" : "")
          }
        >
          <div onClick={() => onSelectNote(note.id)} className="note-body">
            <div className="note-title">{note.title || <em>(Untitled)</em>}</div>
            <div className="note-meta">
              {note.folder && (
                <span className="note-folder badge">{note.folder}</span>
              )}
              {note.tags &&
                note.tags.map(tag => (
                  <span key={tag} className="note-tag badge tag">
                    {tag}
                  </span>
                ))}
            </div>
            <div className="note-preview">{note.content.slice(0, 64)}</div>
          </div>
          <div className="note-actions">
            <button onClick={() => onEditNote(note)} title="Edit note">
              ✏️
            </button>
            <button onClick={() => onDeleteNote(note.id)} title="Delete note">
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NotesList;
