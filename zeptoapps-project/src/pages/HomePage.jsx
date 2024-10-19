import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookCard from '../components/BookCard';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [genres, setGenres] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 9;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://gutendex.com/books');
        const allBooks = response.data.results;

        // Extract unique genres
        const allGenres = Array.from(new Set(allBooks.flatMap(book => book.subjects)));
        setBooks(allBooks);
        setGenres(['All', ...allGenres]);

        // Load wishlist from localStorage
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlist(savedWishlist);

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Handle Wishlist Toggle
  const toggleWishlist = (book) => {
    const updatedWishlist = wishlist.includes(book.id)
      ? wishlist.filter((id) => id !== book.id)
      : [...wishlist, book.id];

    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  // Filter books based on search term and selected genre
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedGenre === 'All' || book.subjects.includes(selectedGenre))
  );

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Gutendex Books</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search books by title..."
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Genre Filter Dropdown */}
      <div className="mb-6">
        <label htmlFor="genre" className="block mb-2 text-lg font-medium">Filter by Genre/Topic:</label>
        <select
          id="genre"
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          {genres.map((genre, index) => (
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      {/* Books Display */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {currentBooks.length > 0 ? (
              currentBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  isWishlisted={wishlist.includes(book.id)}
                  toggleWishlist={toggleWishlist}
                />
              ))
            ) : (
              <p className="text-center col-span-full">No books found.</p>
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center mt-6 space-x-2">
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 bg-gray-300 rounded-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'}`}
            >
              Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-4 py-2 border rounded-md ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100'}`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 bg-gray-300 rounded-md ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'}`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
