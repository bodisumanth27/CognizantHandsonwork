import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom';

function Dashboard() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: '#38bdf8', marginBottom: '1.5rem' }}>Management Console</h2>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <aside style={{ width: '180px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Link to="profile" style={{ color: '#cbd5e1', textDecoration: 'none' }}>👤 User Profile</Link>
          <Link to="settings" style={{ color: '#cbd5e1', textDecoration: 'none' }}>⚙️ Settings</Link>
          <Link to="billing" style={{ color: '#cbd5e1', textDecoration: 'none' }}>💳 Billing Log</Link>
        </aside>
        <main style={{ flex: 1, backgroundColor: '#0f172a', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #334155' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function Profile() { return <div><h4>Personal Profile</h4><p style={{ color: '#94a3b8' }}>Configure security tokens and passwords.</p></div>; }
function Settings() { return <div><h4>System Settings</h4><p style={{ color: '#94a3b8' }}>Toggle notification channels and dark mode.</p></div>; }
function Billing() { return <div><h4>Billing Ledgers</h4><p style={{ color: '#94a3b8' }}>View monthly microservice subscription records.</p></div>; }

export default function App() {
  return (
    <Router>
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0f172a',
        color: '#f8fafc',
        fontFamily: 'system-ui, sans-serif'
      }}>
        <div style={{ maxWidth: '800px', margin: '3rem auto', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '1rem' }}>
          <Routes>
            <Route path="/" element={<Dashboard />}>
              <Route index element={<Profile />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
              <Route path="billing" element={<Billing />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}
