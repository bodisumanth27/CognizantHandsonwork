import React, { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const increment = () => {
    if (count + step <= 100) setCount(count + step);
  };
  const decrement = () => {
    if (count - step >= 0) setCount(count - step);
  };
  const reset = () => setCount(0);
  const double = () => {
    if (count * 2 <= 100) setCount(count * 2);
  };

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
      <div style={{
        backgroundColor: '#1e293b',
        border: '1px solid #334155',
        padding: '2.5rem',
        borderRadius: '1.5rem',
        textAlign: 'center',
        width: '360px',
        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)'
      }}>
        <h2 style={{ color: '#38bdf8', marginBottom: '1.5rem' }}>Interactive Counter</h2>
        <div style={{ fontSize: '4.5rem', fontWeight: 'bold', margin: '1rem 0', color: '#f8fafc' }}>
          {count}
        </div>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ marginRight: '0.5rem', color: '#94a3b8' }}>Step Value:</label>
          <input 
            type="number" 
            value={step} 
            onChange={(e) => setStep(Math.max(1, parseInt(e.target.value) || 1))}
            style={{
              width: '60px',
              padding: '0.3rem',
              backgroundColor: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '0.25rem',
              color: '#fff',
              textAlign: 'center'
            }}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <button onClick={increment} disabled={count + step > 100} style={{
            padding: '0.75rem', backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer'
          }}>Add (+{step})</button>
          <button onClick={decrement} disabled={count - step < 0} style={{
            padding: '0.75rem', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer'
          }}>Subtract (-{step})</button>
          <button onClick={double} style={{
            padding: '0.75rem', backgroundColor: '#8b5cf6', color: '#fff', border: 'none', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer'
          }}>Double (x2)</button>
          <button onClick={reset} style={{
            padding: '0.75rem', backgroundColor: '#475569', color: '#fff', border: 'none', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer'
          }}>Reset</button>
        </div>
      </div>
    </div>
  );
}
