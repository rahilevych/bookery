import { useBooksContext } from '@/context/BookContext';
import { MagnifyingGlass } from '@phosphor-icons/react';
import React, { useState } from 'react';

type Props = {};

const Search = (props: Props) => {
  const { setInput, input, fetchBooks } = useBooksContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setInput(e.target.value);
      fetchBooks();
    } else if (e.target.value === '') {
      setInput('');
    }
  };

  console.log('input  ' + input);
  return (
    <div className='flex flex-row justify-between items-center bg-[#F4F4FF] h-12 rounded w-3/5 p-3'>
      <MagnifyingGlass size={32} className='text-gray-400' />
      <input
        onChange={handleInputChange}
        type='text'
        placeholder='Search'
        className='bg-[#F4F4FF] w-full h-full rounded p-3 placeholder-gray-400::placeholder   focus:outline-none  focus:border-transparent'
      />
    </div>
  );
};

export default Search;
