import React, { useState, useEffect } from 'react';

// Memoized custom hook that caches fetch results
const fetchCache = {};

function useCachedFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCached, setIsCached] = useState(false);

  useEffect(() => {
    if (fetchCache[url]) {
      setData(fetchCache[url]);
      setIsCached(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    setIsCached(false);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        fetchCache[url] = data;
        setData(data);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, isCached };
}

export default function App() {
  const [userId, setUserId] = useState(1);
  const { data: user, loading, isCached } = useCachedFetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      fontFamily: 'system-ui, sans-serif',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#1e293b', padding: '2rem', borderRadius: '1rem', border: '1px solid #334155' }}>
        <h2 style={{ color: '#38bdf8', marginBottom: '1.5rem', textAlign: 'center' }}>Cached Fetch Request</h2>
        
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {[1, 2, 3, 4, 5].map(id => (
            <button key={id} onClick={() => setUserId(id)} style={{
              flex: 1, padding: '0.5rem', cursor: 'pointer', border: 'none', borderRadius: '0.25rem',
              backgroundColor: userId === id ? '#38bdf8' : '#334155', color: userId === id ? '#0f172a' : '#fff', fontWeight: 'bold'
            }}>User {id}</button>
          ))}
        </div>

        {loading ? <p style={{ textAlign: 'center' }}>Loading user data...</p> : (
          <div style={{ padding: '1rem', backgroundColor: '#0f172a', borderRadius: '0.5rem', border: '1px solid #334155' }}>
            <span style={{ fontSize: '0.8rem', color: isCached ? '#10b981' : '#f59e0b', fontWeight: 'bold' }}>
              {isCached ? '⚡ LOADED FROM MEMORY CACHE' : '📡 LOADED VIA NEW HTTP FETCH'}
            </span>
            <h3 style={{ margin: '0.5rem 0' }}>{user.name}</h3>
            <p style={{ margin: '0 0 0.25rem 0', color: '#94a3b8' }}>Email: {user.email}</p>
            <p style={{ margin: 0, color: '#94a3b8' }}>Company: {user.company?.name}</p>
          </div>
        )}
      </div>
    </div>
  );
}
