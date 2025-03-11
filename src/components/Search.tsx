import React, { useState, useCallback, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { fetchBooks } from '@/services/book.Service';

const Search = () => {
  const { setBooks } = useApp();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState('');

  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const loadSearchedBooks = async () => {
    const books = await fetchBooks(pageNumber, 20, searchTerm);
    setBooks(books);
  };
  const debounceFetchBooks = useCallback(
    (value: string) => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(() => {
        setSearchTerm(value);
        setPageNumber((prev) => prev);
        loadSearchedBooks();
      }, 300);
    },
    [setSearchTerm, setPageNumber, loadSearchedBooks]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debounceFetchBooks(value);
    setPageNumber(1);
  };

  return (
    <div>
      <input
        type='text'
        value={searchTerm}
        onChange={handleInputChange}
        placeholder='Search for books...'
        className='w-full p-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'
      />
    </div>
  );
};

export default Search;
