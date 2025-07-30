import React from "react";

// PUBLIC_INTERFACE
function Sidebar({ folders, tags, currentFolder, onSelectFolder, onSelectAll, onSelectTag, currentTag }) {
  /** Left navigation for folders and tags. */
  return (
    <aside className="sidebar-nav">
      <div className="sidebar-section">
        <div className="sidebar-label">Folders</div>
        <ul>
          <li className={!currentFolder && !currentTag ? "active" : ""}>
            <button onClick={onSelectAll}>All Notes</button>
          </li>
          {folders.map(folder => (
            <li key={folder} className={currentFolder === folder ? "active" : ""}>
              <button onClick={() => onSelectFolder(folder)}>{folder}</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar-section">
        <div className="sidebar-label">Tags</div>
        <ul>
          {tags.map(tag => (
            <li key={tag} className={currentTag === tag ? "active" : ""}>
              <button onClick={() => onSelectTag(tag)}>{tag}</button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
