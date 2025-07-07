import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CourierSignup from './CourierSignup';
// Import additional pages/components here as needed

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Welcome to QuickStash</div>} />
        <Route path="/courier-signup" element={<CourierSignup />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
