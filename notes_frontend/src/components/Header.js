import React from "react";

// PUBLIC_INTERFACE
function Header({ onAddNote, onSearchChange, searchValue }) {
  /** Main page header with app name, search bar, and create button. */
  return (
    <header className="header-bar">
      <div className="header-title">Notes</div>
      <div className="header-actions">
        <input
          type="text"
          className="search-input"
          placeholder="Search notes..."
          value={searchValue}
          onChange={e => onSearchChange(e.target.value)}
          aria-label="Search notes"
        />
        <button className="accent-btn" onClick={onAddNote} aria-label="Add note">+ New Note</button>
      </div>
    </header>
  );
}

export default Header;
