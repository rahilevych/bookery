'use client';
import { Book } from '@phosphor-icons/react';
import React from 'react';
import BookPreview from './BookPreview';

type Props = {};

const CategoryBlock = (props: Props) => {
  return (
    <div className='w-full h-auto flex flex-col gap-5'>
      <div className='flex flex-row w-full items-center justify-between'>
        <p className='text-[#090937] font-bold'>Best Seller</p>{' '}
        <p className='text-[#EF6B4A] font-semibold'>View All</p>
      </div>
      <div className='flex flex-row justify-between items-center gap-10'>
        <BookPreview />
        <BookPreview />
        <BookPreview />
        <BookPreview />
      </div>
    </div>
  );
};

export default CategoryBlock;
