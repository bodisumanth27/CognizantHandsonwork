import React, { useState, createContext, useContext } from 'react';

const ThemeContext = createContext();

export default function App() {
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Layout />
    </ThemeContext.Provider>
  );
}

function Layout() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: isDark ? '#0f172a' : '#f8fafc',
      color: isDark ? '#f8fafc' : '#0f172a',
      fontFamily: 'system-ui, sans-serif',
      transition: 'all 0.3s ease'
    }}>
      <header style={{
        backgroundColor: isDark ? '#1e293b' : '#e2e8f0',
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `1px solid ${isDark ? '#334155' : '#cbd5e1'}`
      }}>
        <h2>Context Theme System</h2>
        <button onClick={toggleTheme} style={{
          padding: '0.5rem 1rem', cursor: 'pointer', border: 'none', borderRadius: '0.375rem',
          backgroundColor: isDark ? '#38bdf8' : '#1e293b', color: isDark ? '#0f172a' : '#fff', fontWeight: 'bold'
        }}>
          Toggle to {isDark ? 'Light' : 'Dark'} Mode
        </button>
      </header>
      <main style={{ padding: '3rem 2rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <h3>Shared Context Configuration</h3>
        <p style={{ color: isDark ? '#94a3b8' : '#475569', lineHeight: '1.6', marginTop: '1rem' }}>
          This component consumes theme styling configs globally from ThemeContext. Toggling it updates variables without prop-drilling.
        </p>
      </main>
    </div>
  );
}
