'use client';

import { CaretLeft, Heart, ShoppingCart, User } from '@phosphor-icons/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Loader from '@/components/Loader';
import toast from 'react-hot-toast';
import { Book } from '@/types/types';
import { checkIfLiked, fetchOneBook, likeBook } from '@/services/book.Service';
import { useApp } from '@/context/AppContext';
import { addBookToCart, checkIfInCart } from '@/services/cartService';
import BookFull from '@/components/BookFull';
import CommentsList from '@/components/CommentsList';

const DetailsPage = () => {
  const { isLiked, isInCart, setIsInCart, setIsLiked, setCartItems } = useApp();
  const { id } = useParams();
  const bookId = Array.isArray(id) ? id[0] : id;

  const [book, setBook] = useState<Book | null>(null);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const init = async () => {
    const book = await fetchOneBook(bookId);
    setBook(book);
    if (userId) {
      setIsInCart(await checkIfInCart(userId, id.toString()));
      setIsLiked(await checkIfLiked(userId, id.toString()));
    }
  };

  const handleLike = async () => {
    if (!session?.user) {
      toast.error('Please register or log in to like this book.');
      return;
    }
    setIsLiked(await likeBook(bookId, session));
    if (!isLiked) {
      toast.success('Book was added to wishlist!');
    }
  };

  const handleAddToCart = async () => {
    if (!session?.user || !userId) {
      toast.error('Please register or log in to add this book to your cart.');
      return;
    }
    setIsInCart(await checkIfInCart(userId, id.toString()));
    setCartItems(await addBookToCart(bookId, session));
  };

  useEffect(() => {
    init();
  }, [id]);

  return (
    <div className='bg-white min-h-screen'>
      {book && book._id === id ? (
        <div className='container  mx-auto p-6'>
          <div className='flex flex-row w-full justify-between items-center mb-6'>
            <Link href={'/'}>
              <div className='flex flex-row items-center gap-5'>
                <button className='flex items-center justify-center'>
                  <CaretLeft size={32} className='text-[#6D28D9]' />
                </button>
                <p className='text-xl font-semibold text-[#3A3A3A]'>
                  Books list
                </p>
              </div>
            </Link>

            <div className='flex items-center gap-4'>
              <button
                onClick={handleLike}
                className={`flex items-center justify-center p-2 ${
                  isLiked ? 'text-red-500' : 'text-gray-500'
                } transition-transform transform hover:scale-110 ${
                  !session?.user ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={!session?.user}>
                <Heart size={32} weight={isLiked ? 'fill' : 'regular'} />
              </button>
              <button
                onClick={handleAddToCart}
                className={`flex items-center justify-center p-2 ${
                  isInCart ? 'text-[#6D28D9]' : 'text-gray-500'
                } transition-transform transform hover:scale-110 ${
                  !session?.user ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={!session?.user}>
                <ShoppingCart
                  size={32}
                  weight={isInCart ? 'fill' : 'regular'}
                />
              </button>
            </div>
          </div>
          <div className='flex flex-col w-full justify-center items-center gap-10'>
            <BookFull book={book} />
            <CommentsList bookId={bookId} />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default DetailsPage;
