// /frontend/src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import VendorSignup from './pages/VendorSignup';
import CourierSignup from './pages/CourierSignup';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vendor-signup" element={<VendorSignup />} />
        <Route path="/courier-signup" element={<CourierSignup />} />
      </Routes>
    </Router>
  );
};

export default App;
