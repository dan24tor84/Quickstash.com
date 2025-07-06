import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-black text-white shadow-md px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          QuickStash
        </Link>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        <ul className="hidden md:flex gap-6 text-sm font-medium">
          <li><Link to="/productmenu" className="hover:text-green-400">Menu</Link></li>
          <li><Link to="/checkout" className="hover:text-green-400">Checkout</Link></li>
          <li><Link to="/couriersignup" className="hover:text-green-400">Be a Courier</Link></li>
          <li><Link to="/admindashboard" className="hover:text-green-400">Admin</Link></li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden mt-3 space-y-2 text-sm font-medium">
          <li><Link to="/productmenu" onClick={toggleMenu}>Menu</Link></li>
          <li><Link to="/checkout" onClick={toggleMenu}>Checkout</Link></li>
          <li><Link to="/couriersignup" onClick={toggleMenu}>Be a Courier</Link></li>
          <li><Link to="/admindashboard" onClick={toggleMenu}>Admin</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
