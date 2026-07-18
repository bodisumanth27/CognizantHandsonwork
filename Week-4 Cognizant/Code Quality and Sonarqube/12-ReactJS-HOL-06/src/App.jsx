import React, { useState } from 'react';

export default function App() {
  const products = [
    { id: 1, name: 'Ultra Wireless Headset', category: 'Electronics', price: 129.99 },
    { id: 2, name: 'Ergonomic Office Chair', category: 'Furniture', price: 249.99 },
    { id: 3, name: 'Mechanical Keyboard', category: 'Electronics', price: 89.99 },
    { id: 4, name: 'Dual Monitor Stand', category: 'Furniture', price: 59.99 },
    { id: 5, name: 'L-Shaped Desk', category: 'Furniture', price: 349.99 }
  ];

  const [category, setCategory] = useState('All');

  const filteredProducts = category === 'All' 
    ? products 
    : products.filter(p => p.category === category);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      fontFamily: 'system-ui, sans-serif',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h2>Product Inventory</h2>
          <div>
            <button onClick={() => setCategory('All')} style={{
              marginRight: '0.5rem', padding: '0.5rem 1rem', border: 'none', borderRadius: '0.25rem', cursor: 'pointer',
              backgroundColor: category === 'All' ? '#38bdf8' : '#334155', color: category === 'All' ? '#0f172a' : '#fff'
            }}>All</button>
            <button onClick={() => setCategory('Electronics')} style={{
              marginRight: '0.5rem', padding: '0.5rem 1rem', border: 'none', borderRadius: '0.25rem', cursor: 'pointer',
              backgroundColor: category === 'Electronics' ? '#38bdf8' : '#334155', color: category === 'Electronics' ? '#0f172a' : '#fff'
            }}>Electronics</button>
            <button onClick={() => setCategory('Furniture')} style={{
              padding: '0.5rem 1rem', border: 'none', borderRadius: '0.25rem', cursor: 'pointer',
              backgroundColor: category === 'Furniture' ? '#38bdf8' : '#334155', color: category === 'Furniture' ? '#0f172a' : '#fff'
            }}>Furniture</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {filteredProducts.map(p => (
            <div key={p.id} style={{
              backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.75rem', padding: '1.5rem'
            }}>
              <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 'bold' }}>{p.category}</span>
              <h3 style={{ margin: '0.5rem 0 1rem 0' }}>{p.name}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>${{price: p.price}.price.toFixed(2)}</span>
                <button style={{
                  padding: '0.5rem 1rem', backgroundColor: '#334155', border: 'none', borderRadius: '0.25rem', color: '#fff', cursor: 'pointer'
                }}>Add</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
