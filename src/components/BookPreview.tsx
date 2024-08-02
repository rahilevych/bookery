'use client';
import React from 'react';
import bookImg from '../img/book.png';
type Props = {};

const BookPreview = (props: Props) => {
  return (
    <div className='flex flex-row items-center justify-between w-80 h-52 p-2 bg-[#F4F4FF]'>
      <div className='flex items-center justify-center '>
        <img src={bookImg.src} alt='' className='h-full w-auto' />
      </div>
      <div className='flex flex-col items-start justify-between h-full'>
        <div>
          <p className='text-[#090937] font-semibold'>Dune</p>
          <p className='text-[#09093799] font-semibold'>Frank Herbert</p>
        </div>
        <p className='text-[#6251DD] font-bold'>87,75$</p>
      </div>
    </div>
  );
};

export default BookPreview;
