import React from 'react';
import TodoItem from './TodoItem';
import SymptomItem from './SymptomItem';
import './BrochureSection.css';

const BrochureSection = ({ section, sectionKey, onUpdate }) => {
  if (!section) return null;

  const handleTodoUpdate = (index, completed) => {
    const updatedTodos = [...section.todos];
    updatedTodos[index] = { ...updatedTodos[index], completed };
    onUpdate({ todos: updatedTodos });
  };

  const handleSymptomUpdate = (index, flagged) => {
    const updatedSymptoms = [...section.symptoms];
    updatedSymptoms[index] = { ...updatedSymptoms[index], flagged };
    onUpdate({ symptoms: updatedSymptoms });
  };

  const handleAppointmentUpdate = (index, completed) => {
    const updatedAppointments = [...section.appointments];
    updatedAppointments[index] = { ...updatedAppointments[index], completed };
    onUpdate({ appointments: updatedAppointments });
  };

  const handleMilestoneUpdate = (index, completed) => {
    const updatedMilestones = [...section.milestones];
    updatedMilestones[index] = { ...updatedMilestones[index], completed };
    onUpdate({ milestones: updatedMilestones });
  };

  return (
    <div className="brochure-section">
      <h3 className="section-title">{section.title}</h3>
      
      {section.content && section.content.length > 0 && (
        <div className="section-content">
          <h4>Instructions:</h4>
          <ul className="content-list">
            {section.content.map((item, index) => (
              <li key={index} className="content-item">{item}</li>
            ))}
          </ul>
        </div>
      )}

      {section.todos && section.todos.length > 0 && (
        <div className="interactive-section">
          <h4>To-Do Checklist:</h4>
          <div className="todo-list">
            {section.todos.map((todo, index) => (
              <TodoItem
                key={index}
                todo={todo}
                onUpdate={(completed) => handleTodoUpdate(index, completed)}
              />
            ))}
          </div>
        </div>
      )}

      {section.symptoms && section.symptoms.length > 0 && (
        <div className="interactive-section">
          <h4>Symptom Tracker:</h4>
          <p className="symptom-instruction">
            Check any symptoms you're experiencing to flag them for your healthcare provider:
          </p>
          <div className="symptom-list">
            {section.symptoms.map((symptom, index) => (
              <SymptomItem
                key={index}
                symptom={symptom}
                onUpdate={(flagged) => handleSymptomUpdate(index, flagged)}
              />
            ))}
          </div>
        </div>
      )}

      {section.appointments && section.appointments.length > 0 && (
        <div className="interactive-section">
          <h4>Appointment Checklist:</h4>
          <div className="appointment-list">
            {section.appointments.map((appointment, index) => (
              <TodoItem
                key={index}
                todo={appointment}
                onUpdate={(completed) => handleAppointmentUpdate(index, completed)}
              />
            ))}
          </div>
        </div>
      )}

      {section.milestones && section.milestones.length > 0 && (
        <div className="interactive-section">
          <h4>Recovery Milestones:</h4>
          <div className="milestone-list">
            {section.milestones.map((milestone, index) => (
              <div key={index} className="milestone-item">
                <TodoItem
                  todo={milestone}
                  onUpdate={(completed) => handleMilestoneUpdate(index, completed)}
                />
                {milestone.timeframe && (
                  <span className="milestone-timeframe">({milestone.timeframe})</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BrochureSection;
