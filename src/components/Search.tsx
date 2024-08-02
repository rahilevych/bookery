import { MagnifyingGlass } from '@phosphor-icons/react';
import React from 'react';

type Props = {};

const Search = (props: Props) => {
  return (
    <div className='flex flex-row justify-between items-center bg-[#F4F4FF] h-12 rounded w-3/5 p-3'>
      <MagnifyingGlass size={32} className='text-gray-400' />
      <input
        type='text'
        placeholder='Search'
        className='bg-[#F4F4FF] w-full h-full rounded p-3 placeholder-gray-400::placeholder   focus:outline-none  focus:border-transparent'
      />
    </div>
  );
};

export default Search;
