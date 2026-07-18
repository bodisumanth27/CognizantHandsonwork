import React, { useState, useEffect } from 'react';

export default function App() {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  let greeting = 'Good Evening';
  let gradientClass = 'from-indigo-900 to-slate-900';
  
  if (hours < 12) {
    greeting = 'Good Morning';
    gradientClass = 'from-amber-600 to-orange-950';
  } else if (hours < 18) {
    greeting = 'Good Afternoon';
    gradientClass = 'from-sky-700 to-indigo-950';
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1e293b, #0f172a)',
      color: '#f8fafc',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        padding: '3rem',
        borderRadius: '1.5rem',
        backgroundColor: '#1e293b',
        border: '1px solid #334155',
        textAlign: 'center',
        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)'
      }}>
        <h1 style={{ color: '#38bdf8', fontSize: '2.5rem', margin: '0 0 1rem 0' }}>{greeting}!</h1>
        <p style={{ fontSize: '1.2rem', color: '#94a3b8', margin: '0 0 1.5rem 0' }}>Welcome to React JS HOL-01</p>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', fontFamily: 'monospace' }}>
          {time.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
