import React, { useState } from 'react';
import { createPortal } from 'react-dom';

function PortalModal({ onClose, children }) {
  // Renders the modal overlay at the body level
  return createPortal(
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
    }}>
      <div style={{
        backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '1rem', padding: '2rem', width: '400px', textAlign: 'center'
      }}>
        {children}
        <button onClick={onClose} style={{
          marginTop: '1.5rem', padding: '0.5rem 1.5rem', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '0.25rem', cursor: 'pointer'
        }}>Close Overlay</button>
      </div>
    </div>,
    document.body
  );
}

export default function App() {
  const [open, setOpen] = useState(false);

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
        <h2>Overlay Portals (createPortal)</h2>
        <button onClick={() => setOpen(true)} style={{
          marginTop: '1.5rem', padding: '0.75rem 1.5rem', backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '0.375rem', fontWeight: 'bold', cursor: 'pointer'
        }}>Reveal Portal Modal</button>

        {open && (
          <PortalModal onClose={() => setOpen(false)}>
            <h3 style={{ color: '#38bdf8' }}>Modal Portal Opened</h3>
            <p style={{ color: '#cbd5e1', marginTop: '0.5rem' }}>This overlay node has been injected directly under document.body.</p>
          </PortalModal>
        )}
      </div>
    </div>
  );
}
