import React, { useState, useRef, useEffect } from "react";

// PUBLIC_INTERFACE
function NoteModal({ open, onClose, onSave, initialNote, folders, tags }) {
  /** Modal dialog for creating or editing a note. */
  const [title, setTitle] = useState(initialNote?.title || "");
  const [content, setContent] = useState(initialNote?.content || "");
  const [folder, setFolder] = useState(initialNote?.folder || "");
  const [tagsInput, setTagsInput] = useState(
    initialNote?.tags ? initialNote.tags.join(", ") : ""
  );
  const ref = useRef(null);

  // Autofocus the title input when modal opens
  useEffect(() => {
    if (open && ref.current) ref.current.focus();
  }, [open]);

  useEffect(() => {
    setTitle(initialNote?.title || "");
    setContent(initialNote?.content || "");
    setFolder(initialNote?.folder || "");
    setTagsInput(initialNote?.tags ? initialNote.tags.join(", ") : "");
  }, [initialNote, open]);

  // PUBLIC_INTERFACE
  function handleSubmit(e) {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle && !content.trim()) return;
    onSave({
      ...initialNote,
      title: trimmedTitle,
      content,
      folder: folder.trim(),
      tags: tagsInput
        .split(",")
        .map(t => t.trim())
        .filter(Boolean)
    });
  }

  if (!open) return null;
  return (
    <div className="modal-overlay" tabIndex={-1} onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
        <h2>{initialNote?.id ? "Edit Note" : "New Note"}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title
            <input
              ref={ref}
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              autoFocus
              maxLength={128}
            />
          </label>
          <label>
            Content
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={7}
              required={!title.trim()}
            />
          </label>
          <label>
            Folder
            <input
              type="text"
              value={folder}
              list="folders"
              onChange={e => setFolder(e.target.value)}
            />
            <datalist id="folders">
              {folders.map(fld => (
                <option key={fld} value={fld} />
              ))}
            </datalist>
          </label>
          <label>
            Tags <span className="hint">(comma-separated)</span>
            <input
              type="text"
              value={tagsInput}
              list="tags"
              onChange={e => setTagsInput(e.target.value)}
            />
            <datalist id="tags">
              {tags.map(t => (
                <option key={t} value={t} />
              ))}
            </datalist>
          </label>
          <div className="modal-actions">
            <button type="submit" className="primary-btn">
              {initialNote?.id ? "Save Changes" : "Create Note"}
            </button>
            <button type="button" onClick={onClose} className="secondary-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteModal;
