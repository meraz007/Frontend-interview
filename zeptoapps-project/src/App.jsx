import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import HomePage from './pages/HomePage';
import WishlistPage from './pages/WishlistPage';
import BookDetailPage from './pages/BookDetailPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
        {/* Add a 404 Not Found Page if desired */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

// Optional: 404 Not Found Page
const NotFoundPage = () => (
  <div className="container mx-auto p-4 text-center">
    <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
    <p className="text-gray-700">The page you are looking for does not exist.</p>
  </div>
);

export default App;
