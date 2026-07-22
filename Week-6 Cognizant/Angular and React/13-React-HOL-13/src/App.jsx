import React, { useState, useMemo } from 'react';

export default function App() {
  const [toggle, setToggle] = useState(false);
  const [limit, setLimit] = useState(10);

  const heavyComputation = (n) => {
    console.log('Computing heavy sum...');
    let sum = 0;
    for (let i = 1; i <= n * 1000000; i++) {
      sum += i;
    }
    return sum;
  };

  // Memoize values to prevent recalculating on toggle change
  const computedSum = useMemo(() => heavyComputation(limit), [limit]);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      fontFamily: 'system-ui, sans-serif',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#1e293b', padding: '2rem', borderRadius: '1rem', border: '1px solid #334155', textAlign: 'center' }}>
        <h2 style={{ color: '#38bdf8', marginBottom: '1.5rem' }}>useMemo Calculation</h2>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>N limit (Millions of iterations):</label>
          <input 
            type="number" 
            value={limit} 
            onChange={(e) => setLimit(Math.max(1, parseInt(e.target.value) || 1))}
            style={{ padding: '0.5rem', width: '80px', textAlign: 'center' }}
          />
        </div>

        <button onClick={() => setToggle(!toggle)} style={{
          padding: '0.5rem 1rem', backgroundColor: toggle ? '#10b981' : '#475569', color: '#fff', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', marginBottom: '1.5rem'
        }}>
          Toggle Component State ({toggle ? 'ON' : 'OFF'})
        </button>

        <div style={{ padding: '1rem', backgroundColor: '#0f172a', borderRadius: '0.5rem', fontSize: '1.2rem', fontFamily: 'monospace' }}>
          Sum Computed: {computedSum}
        </div>
      </div>
    </div>
  );
}
