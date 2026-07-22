import React, { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default function App() {
  const [name, setName] = useLocalStorage('usr_name', '');
  const [notifications, setNotifications] = useLocalStorage('notif_active', true);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      fontFamily: 'system-ui, sans-serif',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '450px', margin: '0 auto', backgroundColor: '#1e293b', padding: '2rem', borderRadius: '1rem', border: '1px solid #334155' }}>
        <h2 style={{ color: '#38bdf8', marginBottom: '1.5rem', textAlign: 'center' }}>Persisted Local Settings</h2>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>User Full Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Type profile name..."
            style={{ width: '100%', padding: '0.75rem', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '0.375rem', color: '#fff' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
          <input 
            type="checkbox" 
            checked={notifications} 
            onChange={(e) => setNotifications(e.target.checked)}
            style={{ marginRight: '0.5rem' }}
          />
          <label style={{ color: '#94a3b8' }}>Enable immediate notifications feed</label>
        </div>

        <div style={{ padding: '1rem', backgroundColor: '#0f172a', borderRadius: '0.5rem', border: '1px solid #334155', fontSize: '0.9rem' }}>
          <p><strong>Persisted Name:</strong> {name || 'Not set yet'}</p>
          <p><strong>Notifications Enabled:</strong> {notifications ? 'Yes' : 'No'}</p>
        </div>
      </div>
    </div>
  );
}
