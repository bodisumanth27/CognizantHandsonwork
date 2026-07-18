import React, { useState } from 'react';

export default function App() {
  const [form, setForm] = useState({ name: '', role: 'Developer', newsletter: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('User Registered: ' + JSON.stringify(form));
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      fontFamily: 'system-ui, sans-serif',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '400px', margin: '0 auto', backgroundColor: '#1e293b', padding: '2rem', borderRadius: '1rem', border: '1px solid #334155' }}>
        <h2 style={{ color: '#38bdf8', marginBottom: '1.5rem' }}>Advanced User Profile</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Full Name</label>
            <input type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} required style={{
              width: '100%', padding: '0.75rem', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '0.375rem', color: '#fff'
            }}/>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Preferred Role</label>
            <select value={form.role} onChange={(e) => setForm({...form, role: e.target.value})} style={{
              width: '100%', padding: '0.75rem', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '0.375rem', color: '#fff'
            }}>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Product Manager</option>
            </select>
          </div>
          <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
            <input type="checkbox" checked={form.newsletter} onChange={(e) => setForm({...form, newsletter: e.target.checked})} style={{ marginRight: '0.5rem' }}/>
            <label style={{ color: '#94a3b8' }}>Subscribe to release newsletter</label>
          </div>
          <button type="submit" style={{
            width: '100%', padding: '0.75rem', backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '0.375rem', fontWeight: 'bold', cursor: 'pointer'
          }}>Save Profile</button>
        </form>
      </div>
    </div>
  );
}
