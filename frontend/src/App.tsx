// /frontend/src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        {/* Navbar */}
        <nav style={styles.navbar}>
          <h1 style={styles.logo}>QuickStash</h1>
          <ul style={styles.navLinks}>
            <li>
              <Link to="/" style={styles.link}>Home</Link>
            </li>
            <li>
              <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            </li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

// Simple inline styles for mobile responsiveness
const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#1f1f1f',
    color: '#fff',
    flexWrap: 'wrap' as 'wrap',
  },
  logo: {
    fontSize: '1.5rem',
    margin: 0,
  },
  navLinks: {
    display: 'flex',
    listStyle: 'none',
    gap: '1rem',
    margin: 0,
    padding: 0,
  },
  link: {
    textDecoration: 'none',
    color: '#61dafb',
    fontWeight: 'bold',
  },
};

export default App;
