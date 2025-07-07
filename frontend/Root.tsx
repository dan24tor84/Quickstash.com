import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const Root: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">QuickStash</h1>
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/vendor" className="hover:underline">Vendors</Link>
          <Link to="/courier" className="hover:underline">Couriers</Link>
          <Link to="/admin" className="hover:underline">Admin</Link>
        </nav>
      </header>

      <main className="p-6">
        <Outlet />
      </main>

      <footer className="bg-white text-center p-4 mt-12 shadow-inner text-sm">
        &copy; {new Date().getFullYear()} QuickStash — All rights reserved.
      </footer>
    </div>
  );
};

export default Root;
