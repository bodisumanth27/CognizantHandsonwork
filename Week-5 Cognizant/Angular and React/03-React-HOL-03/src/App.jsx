import React, { useState } from 'react';

export default function App() {
  const students = [
    { id: 1, name: 'John Doe', course: 'Computer Science', gpa: 3.8 },
    { id: 2, name: 'Alice Smith', course: 'Information Tech', gpa: 3.5 },
    { id: 3, name: 'Bob Johnson', course: 'Computer Science', gpa: 3.2 },
    { id: 4, name: 'Clara Oswald', course: 'Physics', gpa: 3.9 },
    { id: 5, name: 'Danny Pink', course: 'Information Tech', gpa: 2.8 }
  ];

  const [query, setQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('All');

  const filteredList = students.filter(s => {
    const matchesQuery = s.name.toLowerCase().includes(query.toLowerCase());
    const matchesCourse = courseFilter === 'All' || s.course === courseFilter;
    return matchesQuery && matchesCourse;
  });

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      fontFamily: 'system-ui, sans-serif',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h2 style={{ color: '#38bdf8', marginBottom: '1.5rem', textAlign: 'center' }}>Student Directory</h2>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <input 
            type="text" 
            placeholder="Search by name..." 
            value={query} 
            onChange={(e) => setQuery(e.target.value)}
            style={{ flex: 1, padding: '0.75rem', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.375rem', color: '#fff' }}
          />
          <select 
            value={courseFilter} 
            onChange={(e) => setCourseFilter(e.target.value)}
            style={{ padding: '0.75rem', backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.375rem', color: '#fff' }}
          >
            <option value="All">All Courses</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Tech">Information Tech</option>
            <option value="Physics">Physics</option>
          </select>
        </div>

        <div style={{ display: 'grid', gap: '1rem' }}>
          {filteredList.map(s => (
            <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1e293b', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #334155' }}>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0' }}>{s.name}</h4>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>{s.course}</p>
              </div>
              <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: s.gpa >= 3.5 ? '#10b981' : '#f59e0b' }}>GPA: {s.gpa}</span>
            </div>
          ))}
          {filteredList.length === 0 && <p style={{ textAlign: 'center', color: '#94a3b8' }}>No student records match search criteria.</p>}
        </div>
      </div>
    </div>
  );
}
