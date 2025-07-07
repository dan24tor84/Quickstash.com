// /frontend/src/pages/Home.tsx

import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Welcome to QuickStash</h2>
      <p style={styles.paragraph}>California’s premier cannabis delivery platform.</p>
      <Link to="/dashboard" style={styles.button}>
        Go to Dashboard
      </Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center' as const,
    padding: '4rem 1rem',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  paragraph: {
    fontSize: '1.25rem',
    marginBottom: '2rem',
  },
  button: {
    backgroundColor: '#16a34a',
    color: '#fff',
    padding: '0.75rem 1.5rem',
    textDecoration: 'none',
    borderRadius: '8px',
    fontWeight: 'bold' as const,
  },
};

export default Home;
