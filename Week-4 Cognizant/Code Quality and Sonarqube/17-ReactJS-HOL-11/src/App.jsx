import React, { useState, createContext, useContext } from 'react';

const ThemeContext = createContext();

export default function App() {
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

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
      backgroundColor: isDark ? '#0f172a' : '#f1f5f9',
      color: isDark ? '#f8fafc' : '#0f172a',
      fontFamily: 'system-ui, sans-serif',
      transition: 'background-color 0.3s ease'
    }}>
      <header style={{
        padding: '1.5rem 2rem',
        backgroundColor: isDark ? '#1e293b' : '#cbd5e1',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2>Theme Context Provider</h2>
        <button onClick={toggleTheme} style={{
          padding: '0.5rem 1rem',
          cursor: 'pointer',
          borderRadius: '0.25rem',
          border: 'none',
          backgroundColor: isDark ? '#e2e8f0' : '#1e293b',
          color: isDark ? '#1e293b' : '#f8fafc',
          fontWeight: 'bold'
        }}>
          Switch to {isDark ? 'Light' : 'Dark'}
        </button>
      </header>
      <main style={{ padding: '3rem 2rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <p>This layout uses standard React Context to toggle design palettes without prop-drilling.</p>
      </main>
    </div>
  );
}
