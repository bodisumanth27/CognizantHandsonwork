import React, { useRef, useState } from 'react';

export default function App() {
  const inputRef = useRef(null);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus();
  };

  const startTimer = () => {
    if (timerRef.current !== null) return;
    timerRef.current = setInterval(() => {
      setTimer(t => t + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      fontFamily: 'system-ui, sans-serif',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* DOM Ref focus */}
        <div style={{ backgroundColor: '#1e293b', padding: '2rem', borderRadius: '1rem', border: '1px solid #334155' }}>
          <h3 style={{ color: '#38bdf8', marginBottom: '1rem' }}>Form Focus Control</h3>
          <input ref={inputRef} type="text" placeholder="Target focus field..." style={{ width: '100%', padding: '0.75rem', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '0.375rem', color: '#fff', marginBottom: '1rem' }}/>
          <button onClick={focusInput} style={{ padding: '0.75rem 1.5rem', backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '0.375rem', fontWeight: 'bold', cursor: 'pointer' }}>Trigger Input Focus</button>
        </div>

        {/* Mutable Ref timer */}
        <div style={{ backgroundColor: '#1e293b', padding: '2rem', borderRadius: '1rem', border: '1px solid #334155', textAlign: 'center' }}>
          <h3 style={{ color: '#38bdf8', marginBottom: '1rem' }}>Interval State Guard</h3>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', margin: '1rem 0' }}>{timer}s</div>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
            <button onClick={startTimer} style={{ padding: '0.5rem 1rem', backgroundColor: '#10b981', color: '#fff', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>Start</button>
            <button onClick={stopTimer} style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '0.25rem', cursor: 'pointer' }}>Stop</button>
          </div>
        </div>
      </div>
    </div>
  );
}
