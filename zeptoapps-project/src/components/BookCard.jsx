import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book, isWishlisted, toggleWishlist }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
      <Link to={`/books/${book.id}`}>
        <img
          src={book.formats['image/jpeg']}
          alt={book.title}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link to={`/books/${book.id}`}>
          <h2 className="text-xl font-bold mb-2 hover:text-blue-600">{book.title}</h2>
        </Link>
        <p className="text-gray-700 mb-1">Author: {book.authors[0]?.name || 'Unknown'}</p>
        <p className="text-gray-700 mb-1">ID: {book.id}</p>
        <p className="text-gray-700">Genres: {book.subjects.join(', ') || 'N/A'}</p>
      </div>

      {/* Wishlist Icon */}
      <button
        onClick={() => toggleWishlist(book)}
        className="absolute top-2 right-2 text-2xl focus:outline-none"
        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {isWishlisted ? '❤️' : '🤍'}
      </button>
    </div>
  );
};

export default BookCard;
