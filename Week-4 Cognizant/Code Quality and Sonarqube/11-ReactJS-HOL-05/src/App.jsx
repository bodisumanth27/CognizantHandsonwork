import React, { useState } from 'react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState('user');

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      fontFamily: 'system-ui, sans-serif',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#1e293b', padding: '2rem', borderRadius: '1rem', border: '1px solid #334155' }}>
        <h2 style={{ color: '#38bdf8', marginBottom: '1.5rem', textAlign: 'center' }}>Enterprise Security Portal</h2>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #334155' }}>
          <div>
            <button onClick={() => setIsLoggedIn(!isLoggedIn)} style={{
              padding: '0.5rem 1rem',
              backgroundColor: isLoggedIn ? '#ef4444' : '#10b981',
              color: '#fff',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}>
              {isLoggedIn ? 'Log Out' : 'Log In'}
            </button>
          </div>
          {isLoggedIn && (
            <div>
              <span style={{ marginRight: '0.5rem', color: '#94a3b8' }}>Role:</span>
              <select value={role} onChange={(e) => setRole(e.target.value)} style={{
                padding: '0.5rem', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155', borderRadius: '0.25rem'
              }}>
                <option value="user">Standard User</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
          )}
        </div>

        {!isLoggedIn ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h3 style={{ color: '#e2e8f0' }}>Welcome, Visitor!</h3>
            <p style={{ color: '#94a3b8' }}>Please authenticate using the button above to view secure data channels.</p>
          </div>
        ) : (
          <div>
            {role === 'admin' ? (
              <div style={{ backgroundColor: '#1e1b4b', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #4338ca' }}>
                <h4 style={{ color: '#f43f5e', margin: '0 0 0.5rem 0' }}>Admin Console Active</h4>
                <p style={{ color: '#c7d2fe', margin: '0' }}>All system endpoints are online. Database health: 100%.</p>
              </div>
            ) : (
              <div style={{ backgroundColor: '#064e3b', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #047857' }}>
                <h4 style={{ color: '#34d399', margin: '0 0 0.5rem 0' }}>User Dashboard Active</h4>
                <p style={{ color: '#a7f3d0', margin: '0' }}>Standard account permissions active. Balance: $10,402.50.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
