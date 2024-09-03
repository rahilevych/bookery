'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import bookImg from '../img/book.png';
import { Book } from '@/types/types';
import { Star, StarHalf } from '@phosphor-icons/react';
type Props = {
  book: Book;
};

const BookPreview = (props: Props) => {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const totalStars = 5;

    return (
      <div className='flex items-center'>
        {Array.from({ length: fullStars }).map((_, index) => (
          <Star
            key={index}
            size={16}
            className='text-yellow-500'
            weight='fill'
          />
        ))}
        {hasHalfStar && <StarHalf size={16} className='text-yellow-500' />}
        {Array.from({
          length: totalStars - fullStars - (hasHalfStar ? 1 : 0),
        }).map((_, index) => (
          <Star
            key={index + fullStars + (hasHalfStar ? 1 : 0)}
            size={16}
            className='text-gray-300'
            weight='regular'
          />
        ))}
      </div>
    );
  };

  return (
    <div className='flex flex-col w-80 h-96 p-4 bg-white shadow-md rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300'>
      <div className='flex items-center justify-center h-48'>
        <img
          src={props.book.thumbnail || bookImg.src}
          alt={props.book.title}
          className='h-full w-auto object-contain rounded-md'
        />
      </div>
      <div className='flex flex-col justify-between flex-grow mt-4'>
        <div>
          <p className='text-lg text-[#090937] font-semibold line-clamp-2'>
            {props.book.title}
          </p>
          <p className='text-sm text-[#09093799] font-medium'>
            {props.book.authors}
          </p>
          <p className='text-sm text-[#09093799]  font-mono'>
            {props.book.categories}
          </p>
          {props.book.average_rating && (
            <div className='mt-2 flex flex-row gap-1'>
              {renderStars(props.book.average_rating)}
              <span className='text-sm text-gray-700'>
                {props.book.average_rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>
        <div className='flex justify-between items-center mt-4'>
          <p className='text-lg text-[#6251DD] font-bold'>
            {props.book.price} $
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookPreview;
