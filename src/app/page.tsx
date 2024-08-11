'use client';
import BookPreview from '@/components/BookPreview';
import CategoryBlock from '@/components/CategoryBlock';
import Navbar from '@/components/Navbar';
import { useBooksContext } from '@/context/BookContext';
import { BookDocument } from '@/models/Book';
import { fetchData } from 'next-auth/client/_utils';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const { status } = useSession();
  const router = useRouter();
  const { fetchBooks, pageNumber, setPageNumber, books } = useBooksContext();

  useEffect(() => {
    fetchBooks();
  }, []);

  const handlePrevBtn = () => {
    if (pageNumber != 1) {
      setPageNumber(pageNumber - 1);
      fetchBooks();
      // router.push(`${page}`);
    } else {
      fetchBooks();
    }
  };

  const handleNextBtn = () => {
    setPageNumber(pageNumber + 1);
    fetchBooks();
  };

  console.log('books' + books);

  const showSession = () => {
    if (status === 'authenticated') {
      return (
        <button
          className='border border-solid border-black rounded'
          onClick={() => {
            signOut({ redirect: false }).then(() => {
              router.push('/');
            });
          }}>
          Sign Out
        </button>
      );
    } else if (status === 'loading') {
      return <span className='text-[#888] text-sm mt-7'>Loading...</span>;
    } else {
      return (
        <Link
          href='/login'
          className='border border-solid border-black rounded'>
          Sign In
        </Link>
      );
    }
  };
  return (
    <div className='bg-white'>
      <Navbar />
      <main className='flex flex-col  items-center justify-center gap-8 bg-white min-h-screen h-auto container mx-auto'>
        <div className='flex flex-row flex-wrap items-center justify-center gap-8 '>
          {' '}
          {books && books.length > 0 ? (
            books.map((book) => (
              <Link key={book._id} href={`book/${book._id}`}>
                <BookPreview
                  key={book._id}
                  _id={book._id}
                  img={book.thumbnail}
                  author={book.authors}
                  title={book.title}
                />
              </Link>
            ))
          ) : (
            <p>No books found</p>
          )}
        </div>

        <div className='flex justify-center gap-7 items-center w-full max-w-3xl mt-4'>
          <button
            onClick={handlePrevBtn}
            className='px-4 py-2 bg-indigo-900 text-white rounded hover:bg-blue-700'>
            Prev
          </button>
          <button
            onClick={handleNextBtn}
            className='px-4 py-2 bg-indigo-900 text-white rounded hover:bg-blue-700'>
            Next
          </button>
        </div>

        {/* {showSession()} */}
      </main>
    </div>
  );
}
