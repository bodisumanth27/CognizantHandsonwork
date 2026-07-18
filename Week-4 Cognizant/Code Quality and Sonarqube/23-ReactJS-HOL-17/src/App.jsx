import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ textAlign: 'center', backgroundColor: '#1e293b', padding: '2rem', borderRadius: '1rem', border: '1px solid #334155' }}>
        <h2 style={{ color: '#38bdf8' }}>Testing Counter Suite</h2>
        <div data-testid="count-display" style={{ fontSize: '3rem', margin: '1rem 0' }}>{count}</div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button data-testid="inc-btn" onClick={() => setCount(count + 1)} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Increment</button>
          <button data-testid="dec-btn" onClick={() => setCount(count - 1)} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Decrement</button>
        </div>
      </div>
    </div>
  );
}
