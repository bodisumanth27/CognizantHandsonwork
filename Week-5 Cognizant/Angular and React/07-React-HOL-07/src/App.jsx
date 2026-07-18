import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return <div style={{ padding: '2rem', textAlign: 'center' }}><h3>Home Portal</h3><p style={{ color: '#94a3b8' }}>Landing view for Week 5 Router HOL.</p></div>;
}

function Services() {
  return <div style={{ padding: '2rem', textAlign: 'center' }}><h3>Our Services</h3><p style={{ color: '#94a3b8' }}>Cloud Architecture, Web Apps, API integration.</p></div>;
}

function Contact() {
  return <div style={{ padding: '2rem', textAlign: 'center' }}><h3>Contact Desk</h3><p style={{ color: '#94a3b8' }}>Reach us at support@cts-fullstack.com</p></div>;
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
          backgroundColor: '#1e293b', padding: '1rem', display: 'flex', justifyContent: 'center', gap: '2rem', borderBottom: '1px solid #334155'
        }}>
          <Link to="/" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
          <Link to="/services" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 'bold' }}>Services</Link>
          <Link to="/contact" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 'bold' }}>Contact</Link>
        </nav>

        <div style={{ maxWidth: '600px', margin: '3rem auto', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '1rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
