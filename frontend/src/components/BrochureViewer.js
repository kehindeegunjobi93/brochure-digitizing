import React, { useState } from 'react';
import BrochureSection from './BrochureSection';
import NotesSection from './NotesSection';
import './BrochureViewer.css';

const BrochureViewer = ({ brochure, onUpdate }) => {
  const [activeSection, setActiveSection] = useState('activityRestrictions');
  const [notes, setNotes] = useState(brochure.notes || '');

  const sections = [
    { key: 'activityRestrictions', title: 'Activity Restrictions', icon: '🚫' },
    { key: 'painManagement', title: 'Pain Management', icon: '💊' },
    { key: 'warningSigns', title: 'Warning Signs', icon: '⚠️' },
    { key: 'followUpSchedule', title: 'Follow-up Schedule', icon: '📅' },
    { key: 'healingTimeline', title: 'Healing Timeline', icon: '⏰' }
  ];

  const handleSectionUpdate = async (sectionKey, updates) => {
    try {
      const updatedSections = {
        ...brochure.sections,
        [sectionKey]: {
          ...brochure.sections[sectionKey],
          ...updates
        }
      };
      
      await onUpdate({ sections: updatedSections });
    } catch (error) {
      console.error('Error updating section:', error);
    }
  };

  const handleNotesUpdate = async (newNotes) => {
    try {
      setNotes(newNotes);
      await onUpdate({ notes: newNotes });
    } catch (error) {
      console.error('Error updating notes:', error);
    }
  };

  return (
    <div className="brochure-viewer">
      <div className="brochure-header">
        <h2>{brochure.title}</h2>
        <p className="brochure-subtitle">
          Track your recovery progress and stay informed about your aftercare
        </p>
      </div>

      <div className="brochure-navigation">
        {sections.map((section) => (
          <button
            key={section.key}
            className={`nav-button ${activeSection === section.key ? 'active' : ''}`}
            onClick={() => setActiveSection(section.key)}
          >
            <span className="nav-icon">{section.icon}</span>
            <span className="nav-title">{section.title}</span>
          </button>
        ))}
        <button
          className={`nav-button ${activeSection === 'notes' ? 'active' : ''}`}
          onClick={() => setActiveSection('notes')}
        >
          <span className="nav-icon">📝</span>
          <span className="nav-title">My Notes</span>
        </button>
      </div>

      <div className="brochure-content">
        {activeSection === 'notes' ? (
          <NotesSection
            notes={notes}
            onNotesUpdate={handleNotesUpdate}
          />
        ) : (
          <BrochureSection
            section={brochure.sections[activeSection]}
            sectionKey={activeSection}
            onUpdate={(updates) => handleSectionUpdate(activeSection, updates)}
          />
        )}
      </div>
    </div>
  );
};

export default BrochureViewer;
