import React from 'react';
import bookImg from '../img/book.png';
import { Book } from '@/types/types';
import StarsRating from './StarsRating';

type Props = {
  book: Book;
};

const BookPreview = ({ book }: Props) => {
  return (
    <div className='flex flex-col w-80 h-[26rem] p-4 bg-white shadow-md rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300'>
      <div className='flex items-center justify-center h-48'>
        <img
          src={book.thumbnail || bookImg.src}
          alt={book.title}
          className='h-full w-auto object-contain rounded-md'
        />
      </div>
      <div className='flex flex-col justify-between flex-grow mt-4'>
        <div>
          <p className='text-lg text-[#090937] font-semibold line-clamp-2'>
            {book.title}
          </p>
          <p className='text-sm text-[#09093799] font-medium'>{book.authors}</p>
          <p className='text-sm text-[#09093799]  font-mono'>
            {book.categories}
          </p>
          {book.average_rating && (
            <div className='mt-2 flex flex-row gap-1'>
              <StarsRating rating={book.average_rating} />
              <span className='text-sm text-gray-700'>
                {book.average_rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>
        <div className='flex justify-between items-center mt-4'>
          <p className='text-lg text-[#6251DD] font-bold'>{book.price} $</p>
        </div>
      </div>
    </div>
  );
};

export default BookPreview;
