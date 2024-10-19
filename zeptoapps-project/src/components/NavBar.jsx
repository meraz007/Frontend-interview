import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Gutendex Books
        </Link>
        <div className="flex space-x-4">
          <NavLink
            to="/"
            exact
            className="text-white hover:text-gray-200"
            activeClassName="underline"
          >
            Home
          </NavLink>
          <NavLink
            to="/wishlist"
            className="text-white hover:text-gray-200"
            activeClassName="underline"
          >
            Wishlist
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
