'use client';
import React from 'react';
import Search from './Search';
import logo from '../img/logo.png';
import { Heart, ShoppingCart, User } from '@phosphor-icons/react';

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className='  bg-white w-full h-28 mb-10'>
      <div className=' container mx-auto flex flex-row items-center justify-between  h-full '>
        {' '}
        <div className='w-16 h-auto'>
          <img src={logo.src} alt='' />
        </div>
        <Search />
        <div className='flex flex-row gap-4 '>
          <div className='bg-[#F4F4FF] h-12 w-12 flex items-center justify-center rounded'>
            <User size={32} className='text-[#090937]' />
          </div>
          <div className='bg-[#F4F4FF] h-12 w-12 flex items-center justify-center rounded'>
            <Heart size={32} className='text-[#090937]' />
          </div>
          <div className='bg-[#F4F4FF] h-12 w-12 flex items-center justify-center rounded'>
            <ShoppingCart size={32} className='text-[#090937]' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
