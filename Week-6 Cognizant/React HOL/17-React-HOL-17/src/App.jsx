import React, { useState, Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', backgroundColor: '#7f1d1d', border: '1px solid #f43f5e', borderRadius: '0.5rem', color: '#fff' }}>
          <h4>Error Boundary Fallback UI</h4>
          <p>The child component crashed unexpectedly. Other parent sections remain functional.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function CrashyComponent() {
  const [crash, setCrash] = useState(false);
  if (crash) {
    throw new Error('Component crashed!');
  }
  return (
    <button onClick={() => setCrash(true)} style={{
      padding: '0.5rem 1.rem', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '0.25rem', cursor: 'pointer'
    }}>Trigger Render Crash</button>
  );
}

export default function App() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{ maxWidth: '400px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '2rem' }}>Resilient Error Boundaries</h2>
        <ErrorBoundary>
          <CrashyComponent />
        </ErrorBoundary>
      </div>
    </div>
  );
}
