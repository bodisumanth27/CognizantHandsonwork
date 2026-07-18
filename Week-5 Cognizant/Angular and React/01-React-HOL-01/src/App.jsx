import React, { useState, useEffect } from 'react';

export default function App() {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    console.log('Resize listener registered');

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      console.log('Resize listener removed');
    };
  }, []);

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
        <h2 style={{ color: '#38bdf8', marginBottom: '1rem' }}>Vite React HOL-01</h2>
        <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>Track window dimensions and test listener cleanups</p>
        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', fontFamily: 'monospace' }}>
          {dimensions.width}px x {dimensions.height}px
        </div>
      </div>
    </div>
  );
}
