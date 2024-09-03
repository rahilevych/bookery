'use client';
import BookPreview from '@/components/BookPreview';
import Navbar from '@/components/Navbar';
import { Book } from '@/types/types';
import Loader from '@/components/Loader';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { CaretLeft } from '@phosphor-icons/react';

const WishList = () => {
  const [wishList, setWishList] = useState<Book[]>([]);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (userId) {
      fetchWishList();
    }
  }, [userId]);

  const fetchWishList = async () => {
    try {
      const res = await fetch(`/api/wishlist?userId=${userId}`, {
        method: 'GET',
      });

      if (!res.ok) throw new Error('Failed to fetch wish list');
      const data = await res.json();
      setWishList(data.books);
    } catch (error) {
      console.error('Error fetching wish list:', error);
    }
  };

  const handleRemoveBook = async (bookId: string) => {
    try {
      const res = await fetch(
        `/api/wishlist?userId=${userId}&bookId=${bookId}`,
        {
          method: 'DELETE',
        }
      );
      if (!res.ok) throw new Error('Failed to remove book');

      setWishList((prevWishList) =>
        prevWishList.filter((book) => book._id !== bookId)
      );
    } catch (error) {
      console.error('Error removing book from wish list:', error);
    }
  };

  return (
    <div className='bg-white min-h-screen'>
      {session?.user.id ? (
        <div className='container mx-auto p-6'>
          <Link href={'/'}>
            <div className='flex flex-row items-center gap-5 p-5'>
              <button className='flex items-center justify-center'>
                <CaretLeft size={32} className='text-[#6D28D9]' />
              </button>
              <p className='text-xl font-semibold text-[#3A3A3A]'>Books list</p>
            </div>
          </Link>
          {wishList ? (
            <>
              {wishList.length > 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {wishList.map((book) => (
                    <div
                      key={book._id}
                      className='flex flex-col justify-between items-center bg-gray-100 p-4 rounded-lg shadow-md'>
                      <Link href={`book/${book._id}`}>
                        <BookPreview book={book} />
                      </Link>
                      <button
                        onClick={() => handleRemoveBook(book._id)}
                        className='mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors'>
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className='flex justify-center items-center h-[60vh]'>
                  <p className='text-center text-2xl text-[#6D28D9] font-semibold'>
                    Your wish list is empty.
                  </p>
                </div>
              )}
            </>
          ) : (
            <Loader></Loader>
          )}
        </div>
      ) : (
        <Link href='/login'>
          <div className='flex justify-center items-center h-[60vh]'>
            <p className='text-center text-2xl text-[#6D28D9] font-semibold text-[#6D28D9] hover:text-[#4c2c9a] transition duration-150'>
              You need to log in to view or modify your wishlist. Please
              register or sign in.
            </p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default WishList;
