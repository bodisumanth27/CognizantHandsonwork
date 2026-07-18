import React, { useState } from 'react';

export default function App() {
  const [form, setForm] = useState({ name: '', email: '', ticketType: 'General', qty: 1, agree: false });
  const [submitted, setSubmitted] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(form);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      fontFamily: 'system-ui, sans-serif',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#1e293b', padding: '2rem', borderRadius: '1rem', border: '1px solid #334155' }}>
        <h2 style={{ color: '#38bdf8', marginBottom: '1.5rem', textAlign: 'center' }}>Event Registration</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Full Name</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '0.375rem', color: '#fff' }}/>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Email Address</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '0.375rem', color: '#fff' }}/>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Ticket Category</label>
            <select name="ticketType" value={form.ticketType} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '0.375rem', color: '#fff' }}>
              <option value="General">General Admission - $50</option>
              <option value="VIP">VIP Lounge - $150</option>
            </select>
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Quantity</label>
            <input type="number" name="qty" min="1" max="10" value={form.qty} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '0.375rem', color: '#fff' }}/>
          </div>
          <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
            <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} required style={{ marginRight: '0.5rem' }}/>
            <label style={{ color: '#94a3b8' }}>I agree to terms and conditions</label>
          </div>
          <button type="submit" style={{ width: '100%', padding: '0.75rem', backgroundColor: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '0.375rem', fontWeight: 'bold', cursor: 'pointer' }}>Register Tickets</button>
        </form>

        {submitted && (
          <div style={{ marginTop: '2rem', padding: '1.25rem', backgroundColor: '#064e3b', borderRadius: '0.5rem', border: '1px solid #047857' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#34d399' }}>Registration Success!</h3>
            <p><strong>Attendee:</strong> {submitted.name}</p>
            <p><strong>Ticket type:</strong> {submitted.ticketType} (Qty: {submitted.qty})</p>
            <p><strong>Total Price:</strong> ${submitted.ticketType === 'VIP' ? submitted.qty * 150 : submitted.qty * 50}</p>
          </div>
        )}
      </div>
    </div>
  );
}
