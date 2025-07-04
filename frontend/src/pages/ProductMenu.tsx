import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AdminDashboard from './pages/AdminDashboard';
import CourierDashboard from './pages/CourierDashboard';
import ProductUpload from './pages/ProductUpload';
import ProductMenu from './pages/ProductMenu';

function Root() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductMenu />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/courier" element={<CourierDashboard />} />
        <Route path="/upload" element={<ProductUpload />} />
        <Route path="/menu" element={<ProductMenu />} />
      </Routes>
    </Router>
  );
}

export default Root;
