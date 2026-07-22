import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';

const booksData = [
  { id: '1', title: 'Clean Code', author: 'Robert C. Martin', desc: 'A Handbook of Agile Software Craftsmanship. Outlines conventions, formatting, and clean structures.' },
  { id: '2', title: 'Refactoring', author: 'Martin Fowler', desc: 'Improving the Design of Existing Code. Details refactoring techniques step-by-step.' },
  { id: '3', title: 'Domain-Driven Design', author: 'Eric Evans', desc: 'Tackling Complexity in the Heart of Software. Standard domain mapping rules.' }
];

function BookCatalog() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: '#38bdf8', marginBottom: '1.5rem', textAlign: 'center' }}>Academic Library Catalog</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {booksData.map(b => (
          <Link key={b.id} to={`/book/${b.id}`} style={{
            display: 'block', backgroundColor: '#0f172a', padding: '1rem', borderRadius: '0.5rem', textDecoration: 'none', border: '1px solid #334155', color: '#fff'
          }}>
            <strong>{b.title}</strong> - {b.author}
          </Link>
        ))}
      </div>
    </div>
  );
}

function BookDetails() {
  const { id } = useParams();
  const book = booksData.find(b => b.id === id);

  if (!book) return <div style={{ padding: '2rem' }}><p>Record not found.</p><Link to="/">Back to catalog</Link></div>;

  return (
    <div style={{ padding: '2rem' }}>
      <Link to="/" style={{ color: '#38bdf8', textDecoration: 'none', display: 'inline-block', marginBottom: '1.5rem' }}>← Return to Catalog</Link>
      <h3 style={{ marginBottom: '0.5rem' }}>{book.title}</h3>
      <p style={{ color: '#38bdf8', marginBottom: '1rem' }}>By {book.author}</p>
      <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>{book.desc}</p>
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
        <div style={{ maxWidth: '600px', margin: '3rem auto', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '1rem' }}>
          <Routes>
            <Route path="/" element={<BookCatalog />} />
            <Route path="/book/:id" element={<BookDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
