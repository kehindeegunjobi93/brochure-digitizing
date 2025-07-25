import React, { useState, useEffect } from 'react';
import './NotesSection.css';

const NotesSection = ({ notes, onNotesUpdate }) => {
  const [localNotes, setLocalNotes] = useState(notes);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);

  const handleSave = () => {
    onNotesUpdate(localNotes);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalNotes(notes);
    setIsEditing(false);
  };

  return (
    <div className="notes-section">
      <h3 className="section-title">My Recovery Notes</h3>
      <p className="notes-description">
        Use this space to track your recovery progress, questions for your doctor, 
        or any observations about your healing process.
      </p>
      
      <div className="notes-container">
        {isEditing ? (
          <div className="notes-editor">
            <textarea
              value={localNotes}
              onChange={(e) => setLocalNotes(e.target.value)}
              placeholder="Write your notes here... You can track symptoms, recovery progress, questions for your doctor, or any other observations."
              className="notes-textarea"
              rows={10}
            />
            <div className="notes-actions">
              <button onClick={handleSave} className="save-button">
                Save Notes
              </button>
              <button onClick={handleCancel} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="notes-display">
            {notes ? (
              <div className="notes-content">
                <pre className="notes-text">{notes}</pre>
              </div>
            ) : (
              <div className="notes-empty">
                <p>No notes yet. Click "Edit Notes" to start tracking your recovery.</p>
              </div>
            )}
            <button onClick={() => setIsEditing(true)} className="edit-button">
              {notes ? 'Edit Notes' : 'Add Notes'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesSection;
