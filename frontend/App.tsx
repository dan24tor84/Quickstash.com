// FILE: frontend/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CourierSignup from './pages/CourierSignup';
import CourierDashboard from './pages/CourierDashboard';
// import other pages like VendorSignup, VendorDashboard if needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/courier/signup" element={<CourierSignup />} />
        <Route path="/courier/dashboard" element={<CourierDashboard />} />
        {/* Add more routes here as needed */}
      </Routes>
    </Router>
  );
}

export default App;
