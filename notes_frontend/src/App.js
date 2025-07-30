import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import "./notes-light.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import NotesList from "./components/NotesList";
import NoteModal from "./components/NoteModal";
import NoteView from "./components/NoteView";
import {
  loadNotes,
  saveNotes,
  generateNoteId,
  sortNotes,
  extractFolders,
  extractTags,
  filterNotes
} from "./utils";

// PUBLIC_INTERFACE
function App() {
  /** The main Notes app component. */
  const [allNotes, setAllNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editNote, setEditNote] = useState(null);
  const [search, setSearch] = useState("");
  const [currentFolder, setCurrentFolder] = useState(null);
  const [currentTag, setCurrentTag] = useState(null);

  useEffect(() => {
    setAllNotes(sortNotes(loadNotes()));
  }, []);

  useEffect(() => {
    saveNotes(allNotes);
  }, [allNotes]);

  // PUBLIC_INTERFACE
  const openNewNoteModal = () => {
    setEditNote(null);
    setModalOpen(true);
  };

  // PUBLIC_INTERFACE
  const openEditNoteModal = useCallback(note => {
    setEditNote(note);
    setModalOpen(true);
  }, []);

  // PUBLIC_INTERFACE
  const closeModal = () => {
    setModalOpen(false);
    setEditNote(null);
  };

  // PUBLIC_INTERFACE
  const handleSaveNote = note => {
    const now = Date.now();
    let updatedNotes;
    if (note.id) {
      // Edit existing
      updatedNotes = allNotes.map(n =>
        n.id === note.id ? { ...note, updated: now } : n
      );
    } else {
      // Create new
      updatedNotes = [
        { ...note, id: generateNoteId(), created: now, updated: now },
        ...allNotes
      ];
    }
    setAllNotes(sortNotes(updatedNotes));
    closeModal();
  };

  // PUBLIC_INTERFACE
  const handleDeleteNote = id => {
    if (!window.confirm("Delete this note?")) return;
    setAllNotes(allNotes.filter(n => n.id !== id));
    if (selectedNoteId === id) setSelectedNoteId(null);
  };

  // PUBLIC_INTERFACE
  const folders = extractFolders(allNotes);
  const tags = extractTags(allNotes);

  // PUBLIC_INTERFACE
  const filteredNotes = filterNotes({
    notes: allNotes,
    folder: currentFolder,
    tag: currentTag,
    search
  });

  const selectedNote = filteredNotes.find(n => n.id === selectedNoteId) || null;

  return (
    <div className="app-shell">
      <Header
        onAddNote={openNewNoteModal}
        onSearchChange={setSearch}
        searchValue={search}
      />
      <div className="main-content-row">
        <Sidebar
          folders={folders}
          tags={tags}
          currentFolder={currentFolder}
          currentTag={currentTag}
          onSelectFolder={folder => {
            setCurrentFolder(folder);
            setCurrentTag(null);
            setSelectedNoteId(null);
          }}
          onSelectAll={() => {
            setCurrentFolder(null);
            setCurrentTag(null);
            setSelectedNoteId(null);
          }}
          onSelectTag={tag => {
            setCurrentTag(tag);
            setCurrentFolder(null);
            setSelectedNoteId(null);
          }}
        />
        <div className="main-panel">
          <div className="notes-list-panel">
            <NotesList
              notes={filteredNotes}
              onSelectNote={id => setSelectedNoteId(id)}
              onEditNote={openEditNoteModal}
              onDeleteNote={handleDeleteNote}
              selectedNoteId={selectedNoteId}
            />
          </div>
          <div className="note-details-panel">
            <NoteView
              note={selectedNote}
              onEdit={openEditNoteModal}
            />
          </div>
        </div>
      </div>
      <NoteModal
        open={modalOpen}
        onClose={closeModal}
        onSave={handleSaveNote}
        initialNote={editNote}
        folders={folders}
        tags={tags}
      />
    </div>
  );
}

export default App;
