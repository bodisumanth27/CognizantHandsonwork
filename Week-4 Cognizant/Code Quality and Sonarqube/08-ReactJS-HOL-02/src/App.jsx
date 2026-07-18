import React from 'react';

function ProfileCard({ name, role, email, status, skills }) {
  return (
    <div style={{
      backgroundColor: '#1e293b',
      border: '1px solid #334155',
      borderRadius: '1rem',
      padding: '1.5rem',
      textAlign: 'center',
      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.3)'
    }}>
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: '#38bdf8',
        margin: '0 auto 1rem auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#0f172a'
      }}>{name[0]}</div>
      <h3 style={{ margin: '0 0 0.25rem 0', color: '#f8fafc' }}>{name}</h3>
      <p style={{ margin: '0 0 0.5rem 0', color: '#38bdf8', fontSize: '0.9rem' }}>{role}</p>
      <p style={{ margin: '0 0 1rem 0', color: '#94a3b8', fontSize: '0.85rem' }}>{email}</p>
      <span style={{
        display: 'inline-block',
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.8rem',
        fontWeight: '600',
        backgroundColor: status === 'Active' ? '#059669' : '#dc2626',
        color: '#fff',
        marginBottom: '1rem'
      }}>{status}</span>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
        {skills.map((skill, idx) => (
          <span key={idx} style={{
            backgroundColor: '#334155',
            padding: '0.2rem 0.5rem',
            borderRadius: '0.25rem',
            fontSize: '0.75rem',
            color: '#cbd5e1'
          }}>{skill}</span>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const users = [
    { name: 'John Doe', role: 'Full Stack Engineer', email: 'john.doe@cts.com', status: 'Active', skills: ['Java', 'React', 'SQL'] },
    { name: 'Alice Smith', role: 'UI Developer', email: 'alice.s@cts.com', status: 'Active', skills: ['HTML', 'CSS', 'JavaScript'] },
    { name: 'Bob Johnson', role: 'Solutions Architect', email: 'bob.j@cts.com', status: 'Inactive', skills: ['AWS', 'Microservices', 'Spring'] }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      fontFamily: 'system-ui, sans-serif',
      padding: '2rem'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#38bdf8' }}>Team Directory</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {users.map((user, idx) => <ProfileCard key={idx} {...user} />)}
      </div>
    </div>
  );
}
