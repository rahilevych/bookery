'use client';
import React, { useState } from 'react';
import {
  Heart,
  ShoppingCart,
  User,
  SignOut,
  SignIn,
  UserPlus,
  List,
  X,
  House,
} from '@phosphor-icons/react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    await signOut({
      redirect: true,
      callbackUrl: '/',
    });
    closeMenu();
  };

  return (
    <div className='bg-[#F0F4F8] w-full h-20  shadow-md border-b border-gray-200'>
      <div className='container mx-auto flex flex-row items-center justify-between h-full px-4'>
        <Link href='/' className='flex items-center' onClick={closeMenu}>
          <span className='text-3xl font-light text-[#6D28D9] italic'>
            Bookery
          </span>
        </Link>

        <div className='flex items-center gap-4 md:hidden z-20'>
          <button
            onClick={toggleMenu}
            className='bg-[#FFFFFF] h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-shadow duration-300 hover:shadow-md'>
            {isMenuOpen ? (
              <X size={24} className='text-[#6D28D9]' />
            ) : (
              <List size={24} className='text-[#6D28D9]' />
            )}
          </button>
        </div>

        <div
          className={`absolute top-16 left-0 w-full bg-white border border-gray-300 rounded-lg shadow-lg md:hidden transition-all duration-300 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
          <div className='flex flex-col p-4'>
            <Link
              href='/'
              className='flex items-center text-gray-700 hover:bg-gray-100 p-2 rounded transition'
              onClick={closeMenu}>
              <House size={20} className='mr-2' />
              <span>Home</span>
            </Link>
            <Link
              href='/wishlist'
              className='flex items-center text-gray-700 hover:bg-gray-100 p-2 rounded transition'
              onClick={closeMenu}>
              <Heart size={20} className='mr-2' />
              <span>Wishlist</span>
            </Link>
            <Link
              href='/cart'
              className='flex items-center text-gray-700 hover:bg-gray-100 p-2 rounded transition'
              onClick={closeMenu}>
              <ShoppingCart size={20} className='mr-2' />
              <span>Cart</span>
            </Link>
            {session ? (
              <>
                <Link
                  href='/profile'
                  className='flex items-center text-gray-700 hover:bg-gray-100 p-2 rounded transition'
                  onClick={closeMenu}>
                  <User size={20} className='mr-2' />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className='flex items-center w-full text-left text-gray-700 hover:bg-gray-100 p-2 rounded transition'>
                  <SignOut size={20} className='mr-2' />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href='/login'
                  className='flex items-center text-gray-700 hover:bg-gray-100 p-2 rounded transition'
                  onClick={closeMenu}>
                  <SignIn size={20} className='mr-2' />
                  <span>Login</span>
                </Link>
                <Link
                  href='/register'
                  className='flex items-center text-gray-700 hover:bg-gray-100 p-2 rounded transition'
                  onClick={closeMenu}>
                  <UserPlus size={20} className='mr-2' />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </div>

        <div className='hidden md:flex items-center gap-4'>
          <div className='relative'>
            <div className='bg-[#FFFFFF] h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-shadow duration-300 hover:shadow-md'>
              <Link href='/wishlist'>
                <Heart size={24} className='text-[#6D28D9]' />
              </Link>
            </div>
          </div>
          <div className='relative'>
            <div className='bg-[#FFFFFF] h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-shadow duration-300 hover:shadow-md'>
              <Link href='/cart'>
                <ShoppingCart size={24} className='text-[#6D28D9]' />
              </Link>
            </div>
          </div>
          <div className='relative'>
            <button
              onClick={toggleDropdown}
              className='bg-[#FFFFFF] h-10 w-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-shadow duration-300 hover:shadow-md'>
              <User size={24} className='text-[#6D28D9]' />
            </button>
            {isDropdownOpen && (
              <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-20 transition-all duration-300 opacity-100'>
                <ul className='flex flex-col'>
                  {session ? (
                    <>
                      <li>
                        <Link
                          href='/profile'
                          className='flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition'
                          onClick={() => setIsDropdownOpen(false)}>
                          <User size={20} className='mr-2' />
                          <span>Profile</span>
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsDropdownOpen(false);
                          }}
                          className='flex items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition'>
                          <SignOut size={20} className='mr-2' />
                          <span>Logout</span>
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          href='/login'
                          className='flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition'
                          onClick={() => setIsDropdownOpen(false)}>
                          <SignIn size={20} className='mr-2' />
                          <span>Login</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href='/register'
                          className='flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition'
                          onClick={() => setIsDropdownOpen(false)}>
                          <UserPlus size={20} className='mr-2' />
                          <span>Register</span>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
