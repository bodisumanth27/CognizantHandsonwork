import React, { useState } from 'react';

export default function App() {
  const [books, setBooks] = useState([
    { id: 1, title: 'Clean Code', author: 'Robert C. Martin' },
    { id: 2, title: 'Refactoring', author: 'Martin Fowler' }
  ]);
  const [formData, setFormData] = useState({ title: '', author: '' });
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.author) return;

    if (editingId) {
      setBooks(books.map(b => b.id === editingId ? { ...b, ...formData } : b));
      setEditingId(null);
    } else {
      setBooks([...books, { id: Date.now(), ...formData }]);
    }
    setFormData({ title: '', author: '' });
  };

  const handleEdit = (book) => {
    setEditingId(book.id);
    setFormData({ title: book.title, author: book.author });
  };

  const handleDelete = (id) => {
    setBooks(books.filter(b => b.id !== id));
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
        <h2 style={{ color: '#38bdf8', marginBottom: '1.5rem', textAlign: 'center' }}>Book Inventory Directory</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
          <input 
            type="text" 
            placeholder="Book Title" 
            value={formData.title} 
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            style={{ flex: 1, padding: '0.75rem', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.375rem', color: '#fff' }}
          />
          <input 
            type="text" 
            placeholder="Author" 
            value={formData.author} 
            onChange={(e) => setFormData({...formData, author: e.target.value})}
            style={{ flex: 1, padding: '0.75rem', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.375rem', color: '#fff' }}
          />
          <button type="submit" style={{ padding: '0.75rem 1.5rem', backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '0.375rem', fontWeight: 'bold', cursor: 'pointer' }}>
            {editingId ? 'Update' : 'Add'}
          </button>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {books.map(b => (
            <div key={b.id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              backgroundColor: '#1e293b', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #334155'
            }}>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0' }}>{b.title}</h4>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>By {b.author}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => handleEdit(b)} style={{ padding: '0.4rem 0.8rem', backgroundColor: '#475569', border: 'none', borderRadius: '0.25rem', color: '#fff', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => handleDelete(b.id)} style={{ padding: '0.4rem 0.8rem', backgroundColor: '#ef4444', border: 'none', borderRadius: '0.25rem', color: '#fff', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
