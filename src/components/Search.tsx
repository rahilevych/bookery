import React, { useState, useCallback, useRef } from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react';
import { useBooksContext } from '@/context/BookContext';

type Props = {};

const Search = (props: Props) => {
  const { setInput, fetchBooks, setPageNumber } = useBooksContext();
  const [searchTerm, setSearchTerm] = useState('');

  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debounceFetchBooks = useCallback(
    (value: string) => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      debounceTimeoutRef.current = setTimeout(() => {
        setInput(value);
        setPageNumber(1);
        fetchBooks();
      }, 300);
    },
    [fetchBooks, setInput]
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
      <div className='absolute top-1/2 left-3 transform -translate-y-1/2'>
        <MagnifyingGlass size={20} className='text-gray-500' />
      </div>
    </div>
  );
};

export default Search;
