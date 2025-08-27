
import { useState,useEffect } from 'react';
import api from '../api/axios';


function StudentDashboard() {
    const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get("/books/all");
        setBooks(res.data.books); // backend returns { message, books }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) return <p className="text-center">Loading books...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">📚 All Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {books.map((book) => (
          <div
            key={book._id}
            className="p-4 rounded-2xl shadow-md bg-white border border-gray-200"
          >
            <h3 className="text-lg font-semibold">{book.title}</h3>
            <p className="text-sm text-gray-600">Author: {book.author}</p>
            <p className="text-sm text-gray-500">Year: {book.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentDashboard;