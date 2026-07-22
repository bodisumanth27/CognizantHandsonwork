import React from 'react';

export default function HeavyWidget() {
  return (
    <div style={{
      backgroundColor: '#1e293b', border: '1px solid #10b981', padding: '2rem', borderRadius: '1rem'
    }}>
      <h3 style={{ color: '#10b981' }}>Heavy Module Initialized Successfully!</h3>
      <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Loaded asynchronously on request.</p>
    </div>
  );
}
