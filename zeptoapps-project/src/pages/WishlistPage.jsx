import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';

const WishlistPage = () => {
  const [wishlistBooks, setWishlistBooks] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    // Load wishlist from localStorage
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlistIds(savedWishlist);

    if (savedWishlist.length === 0) {
      setLoading(false);
      return;
    }

    // Fetch details for wishlisted books
    const fetchWishlistBooks = async () => {
      try {
        const promises = savedWishlist.map(id => axios.get(`https://gutendex.com/books/${id}`));
        const responses = await Promise.all(promises);
        const books = responses.map(res => res.data);
        setWishlistBooks(books);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch wishlist books');
        setLoading(false);
      }
    };

    fetchWishlistBooks();
  }, []);

  // Handle Wishlist Toggle (remove from wishlist)
  const toggleWishlist = (book) => {
    const updatedWishlist = wishlistIds.includes(book.id)
      ? wishlistIds.filter((id) => id !== book.id)
      : [...wishlistIds, book.id];

    setWishlistIds(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));

    if (updatedWishlist.includes(book.id)) {
      setWishlistBooks([...wishlistBooks, book]);
    } else {
      setWishlistBooks(wishlistBooks.filter(b => b.id !== book.id));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">My Wishlist</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : wishlistBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlistBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              isWishlisted={true}
              toggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      ) : (
        <p className="text-center">Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default WishlistPage;
