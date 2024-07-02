import React, { useState, useEffect } from 'react';
import './App.css';
import AddBook from './AddBook';
import EditBook from './EditBook';
import BookList from './BookList';

function App() {
  const [books, setBooks] = useState([]);
  const [editBookId, setEditBookId] = useState(null);

  useEffect(() => {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const addBook = (book) => {
    book.id = Math.random().toString(36).substr(2, 9);
    setBooks([...books, book]);
  };

  const saveBook = (id, updatedBook) => {
    const updatedBooks = books.map((book) =>
      book.id === id ? { ...book, ...updatedBook } : book
    );
    setBooks(updatedBooks);
    setEditBookId(null);
  };

  const deleteBook = (id) => {
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
  };

  const editBook = (id) => {
    setEditBookId(id);
  };

  return (
    <div className="App">
      <h1>Library Management System</h1>
      {editBookId ? (
        <EditBook
          book={books.find((book) => book.id === editBookId)}
          onSave={saveBook}
          onCancel={() => setEditBookId(null)}
        />
      ) : (
        <AddBook onAdd={addBook} />
      )}
      <BookList books={books} onEdit={editBook} onDelete={deleteBook} />
    </div>
  );
}

export default App;
