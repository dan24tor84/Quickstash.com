import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav style={styles.nav}>
      <h1 style={styles.logo}>QuickStash</h1>
      <div style={styles.links}>
        <Link style={styles.link} to="/menu">Menu</Link>
        <Link style={styles.link} to="/upload">Upload</Link>
        <Link style={styles.link} to="/courier">Courier</Link>
        <Link style={styles.link} to="/admin">Admin</Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: '1rem 2rem',
    color: '#fff',
  },
  logo: {
    margin: 0,
    fontSize: '1.5rem',
  },
  links: {
    display: 'flex',
    gap: '1rem',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default NavBar;
