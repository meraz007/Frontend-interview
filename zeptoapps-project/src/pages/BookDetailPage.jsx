import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookDetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`https://gutendex.com/books/${id}`);
        setBook(response.data);

        // Check if the book is wishlisted
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setIsWishlisted(savedWishlist.includes(response.data.id));

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch book details');
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  // Handle Wishlist Toggle
  const toggleWishlist = () => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    let updatedWishlist;

    if (isWishlisted) {
      updatedWishlist = savedWishlist.filter((bookId) => bookId !== book.id);
    } else {
      updatedWishlist = [...savedWishlist, book.id];
    }

    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    setIsWishlisted(!isWishlisted);
  };

  if (loading) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-4 text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row">
      <div className="md:w-1/3">
        <img
          src={book.formats['image/jpeg']}
          alt={book.title}
          className="w-full h-auto object-cover rounded-lg shadow-md"
        />
        <button
          onClick={toggleWishlist}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          {isWishlisted ? 'Remove from Wishlist ❤️' : 'Add to Wishlist 🤍'}
        </button>
      </div>
      <div className="md:w-2/3 md:pl-6 mt-6 md:mt-0">
        <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
        <p className="text-gray-700 mb-1"><strong>Author:</strong> {book.authors.map(author => author.name).join(', ')}</p>
        <p className="text-gray-700 mb-1"><strong>ID:</strong> {book.id}</p>
        <p className="text-gray-700 mb-1"><strong>Genres:</strong> {book.subjects.join(', ')}</p>
        <p className="text-gray-700"><strong>Bookshelves:</strong> {book.bookshelves.join(', ') || 'N/A'}</p>
        <p className="text-gray-700 mt-4"><strong>Description:</strong></p>
        <p className="text-gray-600">
          {book.authors[0]?.birth_year || 'N/A'} - {book.authors[0]?.death_year || 'Present'}
        </p>
      </div>
    </div>
  );
};

export default BookDetailPage;
