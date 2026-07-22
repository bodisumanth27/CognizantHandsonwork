import React, { useState, Suspense, lazy } from 'react';

// Lazy loaded heavy component
const HeavyWidget = lazy(() => new Promise(resolve => {
  setTimeout(() => resolve(import('./HeavyWidget')), 1500);
}));

export default function App() {
  const [load, setLoad] = useState(false);

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
      <div style={{ textAlign: 'center' }}>
        <h2>Dynamic Code Splitting</h2>
        <button onClick={() => setLoad(true)} style={{
          marginTop: '1.5rem', padding: '0.75rem 1.5rem', backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '0.375rem', fontWeight: 'bold', cursor: 'pointer'
        }}>Load Heavy Component</button>

        {load && (
          <div style={{ marginTop: '2rem' }}>
            <Suspense fallback={<p>Bundling dynamic chunk module...</p>}>
              <HeavyWidget />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
}
