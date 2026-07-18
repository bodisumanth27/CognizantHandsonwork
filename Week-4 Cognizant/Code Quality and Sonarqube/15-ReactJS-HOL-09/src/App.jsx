import React, { useState, useEffect } from 'react';

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        if (!res.ok) throw new Error('API server returned error');
        return res.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      fontFamily: 'system-ui, sans-serif',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ color: '#38bdf8', marginBottom: '2rem', textAlign: 'center' }}>User Directory</h2>

        {loading && <p style={{ textAlign: 'center' }}>Loading user directory...</p>}
        {error && <p style={{ textAlign: 'center', color: '#ef4444' }}>{error}</p>}
        
        {!loading && !error && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {users.map(u => (
              <div key={u.id} style={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.75rem', padding: '1.5rem' }}>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>{u.name}</h3>
                <p style={{ margin: '0 0 0.25rem 0', color: '#94a3b8' }}>📧 {u.email}</p>
                <p style={{ margin: '0 0 0.25rem 0', color: '#94a3b8' }}>📞 {u.phone}</p>
                <p style={{ margin: '0', color: '#38bdf8', fontSize: '0.9rem' }}>🌐 {u.website}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
