import { Book } from '@/types/types';
import React from 'react';

interface Props {
  book: Book;
}

const BookFull = ({ book }: Props) => {
  return (
    <div className='flex flex-col md:flex-row w-full gap-6 justify-center items-center md:items-center'>
      <div className='w-full md:w-1/2 flex justify-center'>
        <img
          src={book?.thumbnail}
          alt='Book Thumbnail'
          className='w-[60%] max-w-[150px] md:max-w-[200px] h-auto rounded-lg object-contain'
        />
      </div>

      <div className='w-full md:w-1/2 flex flex-col justify-between text-center md:text-left'>
        <p className='text-2xl md:text-3xl font-bold text-[#3A3A3A] mb-2'>
          {book?.title}
        </p>
        <p className='text-base md:text-lg text-gray-600 mb-4'>
          {book?.authors}
        </p>
        <div className='bg-[#F4F4FF] p-4 rounded-lg shadow-md'>
          <p className='text-lg md:text-xl font-semibold text-[#3A3A3A] mb-2'>
            Summary
          </p>
          <p className='text-gray-700 text-sm md:text-base'>
            {book?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookFull;
