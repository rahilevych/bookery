import { useApp } from '@/context/AppContext';
import { checkIfLiked, fetchOneBook, likeBook } from '@/services/book.Service';
import { addBookToCart, checkIfInCart } from '@/services/cartService';
import { Book } from '@/types/types';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useBook = () => {
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
      setIsInCart(await checkIfInCart(userId, bookId));
      setIsLiked(await checkIfLiked(userId, bookId));
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

  return {
    book,
    bookId,
    isLiked,
    isInCart,
    handleLike,
    handleAddToCart,
    session,
  };
};

export default useBook;
