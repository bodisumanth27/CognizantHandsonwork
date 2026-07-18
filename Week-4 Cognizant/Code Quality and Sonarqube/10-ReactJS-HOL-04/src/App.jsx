import React, { useState } from 'react';

export default function App() {
  const faqs = [
    { q: 'What is React?', a: 'React is a popular declarative JavaScript library created by Facebook for developing modular user interfaces.' },
    { q: 'What are React Hooks?', a: 'Hooks are functions that let you "hook into" React state and lifecycle features from functional components.' },
    { q: 'Why is the key prop needed in lists?', a: 'Keys help React identify which items have changed, are added, or are removed, ensuring proper component reuse.' }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (idx) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      fontFamily: 'system-ui, sans-serif',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', color: '#38bdf8', marginBottom: '2rem' }}>React FAQ Accordion</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, idx) => (
            <div key={idx} style={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '0.75rem',
              overflow: 'hidden'
            }}>
              <button 
                onClick={() => toggle(idx)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '1.25rem',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#fff',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span>{faq.q}</span>
                <span style={{ color: '#38bdf8' }}>{activeIndex === idx ? '−' : '+'}</span>
              </button>
              {activeIndex === idx && (
                <div style={{
                  padding: '0 1.25rem 1.25rem 1.25rem',
                  color: '#94a3b8',
                  lineHeight: '1.6'
                }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
