import React, { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return { data, loading };
}

export default function App() {
  const { data: users, loading } = useFetch('https://jsonplaceholder.typicode.com/users');

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      fontFamily: 'system-ui, sans-serif',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ color: '#38bdf8', marginBottom: '2rem' }}>Custom Hooks Fetch</h2>
        
        {loading ? <p>Loading users...</p> : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {users.slice(0, 5).map(u => (
              <li key={u.id} style={{
                backgroundColor: '#1e293b', padding: '1rem', marginBottom: '0.5rem', borderRadius: '0.5rem', border: '1px solid #334155'
              }}>
                {u.name} - {u.email}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
