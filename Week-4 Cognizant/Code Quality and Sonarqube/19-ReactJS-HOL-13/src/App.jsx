import React, { useReducer, useState } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case 'TOGGLE':
      return state.map(task => task.id === action.payload ? { ...task, completed: !task.completed } : task);
    case 'DELETE':
      return state.filter(task => task.id !== action.payload);
    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, [
    { id: 1, text: 'Learn React Hooks', completed: true },
    { id: 2, text: 'Configure Web API Layer', completed: false }
  ]);
  const [text, setText] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    dispatch({ type: 'ADD', payload: text });
    setText('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      fontFamily: 'system-ui, sans-serif',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#1e293b', padding: '2rem', borderRadius: '1rem', border: '1px solid #334155' }}>
        <h2 style={{ color: '#38bdf8', marginBottom: '1.5rem' }}>Task Tracker (useReducer)</h2>
        
        <form onSubmit={handleAdd} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <input 
            type="text" 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            placeholder="Add a new task..."
            style={{ flex: 1, padding: '0.75rem', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '0.375rem', color: '#fff' }}
          />
          <button type="submit" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '0.375rem', fontWeight: 'bold', cursor: 'pointer' }}>Add</button>
        </form>

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {state.map(task => (
            <li key={task.id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              backgroundColor: '#0f172a', padding: '1rem', marginBottom: '0.5rem', borderRadius: '0.375rem', border: '1px solid #334155'
            }}>
              <span 
                onClick={() => dispatch({ type: 'TOGGLE', payload: task.id })}
                style={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#64748b' : '#fff', cursor: 'pointer' }}
              >
                {task.text}
              </span>
              <button onClick={() => dispatch({ type: 'DELETE', payload: task.id })} style={{
                backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', cursor: 'pointer'
              }}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
