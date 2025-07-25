import React from 'react';
import './SymptomItem.css';

const SymptomItem = ({ symptom, onUpdate }) => {
  const handleChange = (e) => {
    onUpdate(e.target.checked);
  };

  return (
    <div className={`symptom-item ${symptom.flagged ? 'flagged' : ''}`}>
      <label className="symptom-label">
        <input
          type="checkbox"
          checked={symptom.flagged}
          onChange={handleChange}
          className="symptom-checkbox"
        />
        <span className="symptom-text">{symptom.text}</span>
        <span className="symptom-flag">⚠️</span>
      </label>
      {symptom.flagged && (
        <div className="symptom-alert">
          <small>This symptom has been flagged. Consider contacting your healthcare provider.</small>
        </div>
      )}
    </div>
  );
};

export default SymptomItem;
