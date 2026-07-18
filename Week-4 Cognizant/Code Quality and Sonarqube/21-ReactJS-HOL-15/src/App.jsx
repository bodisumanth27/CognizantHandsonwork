import React, { useState, useMemo, useCallback } from 'react';

export default function App() {
  const [range, setRange] = useState(10);
  const [theme, setTheme] = useState('dark');

  // Heavy calculation
  const calculatePrimes = (max) => {
    console.log('Calculating prime numbers...');
    const primes = [];
    for (let i = 2; i <= max; i++) {
      let isPrime = true;
      for (let j = 2; j <= Math.sqrt(i); j++) {
        if (i % j === 0) {
          isPrime = false;
          break;
        }
      }
      if (isPrime) primes.push(i);
    }
    return primes;
  };

  // Memoize heavy calculation
  const primeList = useMemo(() => calculatePrimes(range), [range]);

  // Memoize callback click handler
  const handleToggleTheme = useCallback(() => {
    setTheme(t => t === 'dark' ? 'light' : 'dark');
  }, []);

  const isDark = theme === 'dark';

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: isDark ? '#0f172a' : '#f1f5f9',
      color: isDark ? '#f8fafc' : '#0f172a',
      fontFamily: 'system-ui, sans-serif',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: isDark ? '#1e293b' : '#cbd5e1', padding: '2rem', borderRadius: '1rem' }}>
        <h2>Performance Optimization</h2>
        <div style={{ display: 'flex', gap: '1rem', margin: '1.5rem 0' }}>
          <button onClick={handleToggleTheme} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Toggle Theme</button>
          <input 
            type="number" 
            value={range} 
            onChange={(e) => setRange(Math.max(10, parseInt(e.target.value) || 10))}
            style={{ width: '80px', padding: '0.5rem' }}
          />
        </div>
        <p>Prime numbers found up to {range}:</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', padding: '1rem', backgroundColor: isDark ? '#0f172a' : '#e2e8f0', borderRadius: '0.5rem' }}>
          {primeList.map((p, idx) => <span key={idx}>{p}</span>)}
        </div>
      </div>
    </div>
  );
}
