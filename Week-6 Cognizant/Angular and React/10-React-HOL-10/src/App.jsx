import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then(res => {
        setPosts(res.data);
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
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ color: '#38bdf8', marginBottom: '2rem', textAlign: 'center' }}>Axios API Feed</h2>
        
        {loading && <p style={{ textAlign: 'center' }}>Loading Axios posts feeds...</p>}
        {error && <p style={{ textAlign: 'center', color: '#ef4444' }}>Error: {error}</p>}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {posts.map(post => (
            <div key={post.id} style={{ backgroundColor: '#1e293b', padding: '1.25rem', borderRadius: '0.75rem', border: '1px solid #334155' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#e2e8f0' }}>{post.title}</h3>
              <p style={{ margin: 0, color: '#94a3b8', lineHeight: '1.5' }}>{post.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
