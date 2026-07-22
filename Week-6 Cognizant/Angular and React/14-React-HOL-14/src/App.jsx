import React, { useState, useCallback } from 'react';

const ExpensiveButton = React.memo(({ onClick, label }) => {
  console.log('Rendering button:', label);
  return (
    <button onClick={onClick} style={{
      padding: '0.75rem 1.5rem', backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '0.375rem', fontWeight: 'bold', cursor: 'pointer'
    }}>
      {label}
    </button>
  );
});

export default function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // Memoize click handlers
  const handleIncrement = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      fontFamily: 'system-ui, sans-serif',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#1e293b', padding: '2rem', borderRadius: '1rem', border: '1px solid #334155', textAlign: 'center' }}>
        <h2 style={{ color: '#38bdf8', marginBottom: '1.5rem' }}>useCallback Optimization</h2>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <input 
            type="text" 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            placeholder="Type to trigger parent render..."
            style={{ width: '100%', padding: '0.75rem', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '0.375rem', color: '#fff' }}
          />
        </div>

        <div style={{ fontSize: '3rem', margin: '1rem 0' }}>{count}</div>
        
        <ExpensiveButton onClick={handleIncrement} label="Increment Count" />
      </div>
    </div>
  );
}
