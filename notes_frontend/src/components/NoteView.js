import React from "react";

// PUBLIC_INTERFACE
function NoteView({ note, onEdit }) {
  /** Displays selected note's detail, with edit button. */
  if (!note)
    return <div className="note-view empty">Select a note to preview its content.</div>;

  return (
    <div className="note-view">
      <div className="note-view-header">
        <h2>{note.title || <em>(Untitled)</em>}</h2>
        <button className="edit-btn" onClick={() => onEdit(note)}>
          ✏️ Edit
        </button>
      </div>
      <div className="note-view-meta">
        {note.folder && (
          <span className="note-folder badge">{note.folder}</span>
        )}
        {note.tags?.map(tag => (
          <span key={tag} className="note-tag badge tag">
            {tag}
          </span>
        ))}
      </div>
      <div className="note-view-content">{note.content || <em>(No content)</em>}</div>
    </div>
  );
}

export default NoteView;
