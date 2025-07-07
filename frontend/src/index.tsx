import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Make sure App.tsx is in the same folder or update the path
import './index.css'; // Optional: only if you're using a global stylesheet

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found. Please ensure there is a div with id="root" in public/index.html');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
