'use client';
import BookPreview from '@/components/BookPreview';
import Navbar from '@/components/Navbar';
import { Book } from '@/types/types';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type Props = {};

const WishList = (props: Props) => {
  const [wishList, setWishList] = useState<Book[]>([]);
  const [newBookId, setNewBookId] = useState<string>('');
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    console.log('userId wish' + userId);
    if (session) {
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
      const res = await fetch('/api/wishlist', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId }),
      });
      if (!res.ok) throw new Error('Failed to remove book');
      const data = await res.json();
      setWishList(data.wishList);
    } catch (error) {
      console.error('Error removing book from wish list:', error);
    }
  };

  return (
    <div className='bg-white h-screen'>
      <div className='container mx-auto p-6'>
        <Navbar />

        {userId ? (
          <div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {wishList.map((book) => (
                <Link key={book._id} href={`book/${book._id}`}>
                  <BookPreview
                    key={book._id}
                    _id={book._id}
                    img={book.thumbnail}
                    author={book.authors}
                    title={book.title}
                  />
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <p className='text-center text-xl'>
            Please log in to view your wish list.
          </p>
        )}
      </div>
    </div>
  );
};

export default WishList;
