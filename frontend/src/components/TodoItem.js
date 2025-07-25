import React from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, onUpdate }) => {
  const handleChange = (e) => {
    onUpdate(e.target.checked);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <label className="todo-label">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleChange}
          className="todo-checkbox"
        />
        <span className="todo-text">{todo.text}</span>
        <span className="checkmark"></span>
      </label>
    </div>
  );
};

export default TodoItem;
