import React from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, addToCart, removeFromCart } from './services/store';

function CartUI() {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const mockProducts = [
    { id: 1, name: 'Ultra Wireless Headset', price: 99 },
    { id: 2, name: 'Mechanical Keyboard', price: 79 }
  ];

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#1e293b', padding: '2rem', borderRadius: '1rem', border: '1px solid #334155' }}>
      <h2 style={{ color: '#38bdf8', marginBottom: '1.5rem', textAlign: 'center' }}>Shopping Cart (Redux Toolkit)</h2>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3>Available Products</h3>
        {mockProducts.map(p => (
          <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', margin: '0.5rem 0', padding: '0.5rem', backgroundColor: '#0f172a', borderRadius: '0.25rem' }}>
            <span>{p.name} - ${p.price}</span>
            <button onClick={() => dispatch(addToCart(p))} style={{ backgroundColor: '#10b981', color: '#fff', border: 'none', padding: '0.25rem 0.5rem', cursor: 'pointer' }}>Add</button>
          </div>
        ))}
      </div>

      <div>
        <h3>Your Cart Items ({cart.length})</h3>
        {cart.map(item => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', margin: '0.5rem 0' }}>
            <span>{item.name} (Qty: {item.qty})</span>
            <button onClick={() => dispatch(removeFromCart(item.id))} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '0.25rem 0.5rem', cursor: 'pointer' }}>Remove</button>
          </div>
        ))}
        {cart.length === 0 && <p style={{ color: '#94a3b8' }}>Cart is empty.</p>}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0f172a',
        color: '#f8fafc',
        fontFamily: 'system-ui, sans-serif',
        padding: '2rem'
      }}>
        <CartUI />
      </div>
    </Provider>
  );
}
