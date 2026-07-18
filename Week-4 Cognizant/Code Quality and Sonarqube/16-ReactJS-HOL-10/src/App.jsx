import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Home Screen</h2>
      <p style={{ color: '#94a3b8' }}>Welcome to the React Router landing view.</p>
    </div>
  );
}

function About() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>About Screen</h2>
      <p style={{ color: '#94a3b8' }}>This app demonstrates declarative client side routing.</p>
    </div>
  );
}

function Contact() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Contact Screen</h2>
      <p style={{ color: '#94a3b8' }}>Email us at support@cts.com for support assistance.</p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0f172a',
        color: '#f8fafc',
        fontFamily: 'system-ui, sans-serif'
      }}>
        <nav style={{
          backgroundColor: '#1e293b',
          padding: '1rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          borderBottom: '1px solid #334155'
        }}>
          <Link to="/" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
          <Link to="/about" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 'bold' }}>About</Link>
          <Link to="/contact" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 'bold' }}>Contact</Link>
        </nav>

        <div style={{ maxWidth: '800px', margin: '2rem auto', backgroundColor: '#1e293b', borderRadius: '1rem', border: '1px solid #334155' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
