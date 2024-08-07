'use client';
import BookPreview from '@/components/BookPreview';
import CategoryBlock from '@/components/CategoryBlock';
import Navbar from '@/components/Navbar';
import { BookDocument } from '@/models/Book';
import { fetchData } from 'next-auth/client/_utils';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const { status } = useSession();
  const router = useRouter();
  const [books, setBooks] = useState<BookDocument[]>([]);
  const [pageB, setPage] = useState(1);
  const [sizeB, setSizeB] = useState(5);

  async function fetchBooks() {
    console.log('pageB sizeB', pageB, sizeB);
    try {
      const res = await fetch(`/api/books?page=${pageB}&size=${sizeB}`);

      if (!res.ok) {
        throw new Error('Erorr by fetching books');
      }
      const data = await res.json();

      setBooks(data.books);
    } catch (error) {
      console.error('Error by fetching books', error);
    }
  }
  useEffect(() => {
    fetchBooks();
  }, []);

  const handlePrevBtn = () => {
    if (pageB != 1) {
      setPage(pageB - 1);
      fetchBooks();
      // router.push(`${page}`);
    } else {
      fetchBooks();
    }
  };

  const handleNextBtn = () => {
    setPage(pageB + 1);

    if (pageB % 20 === 0) {
      setPage(pageB + 1);
    }
    console.log(sizeB);
    fetchBooks();
    //router.push(`${page}`);
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
      <main className='flex flex-row flex-wrap items-center justify-center gap-8 bg-white min-h-screen h-auto container mx-auto'>
        {books && books.length > 0 ? (
          books.map((book) => (
            <BookPreview
              key={book._id}
              img={book.thumbnail}
              author={book.authors}
              title={book.title}
            />
          ))
        ) : (
          <p>No books found</p>
        )}
        <div className='flex justify-center gap-7 items-center w-full max-w-3xl mt-4'>
          <button
            onClick={handlePrevBtn}
            className='px-4 py-2 bg-indigo-900 text-white rounded hover:bg-blue-700'>
            Prev
          </button>
          <Link href='/characters/1'>
            <button className='bg-indigo-900 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 ease-in-out'>
              Back to list
            </button>
          </Link>
          <button
            onClick={handleNextBtn}
            className='px-4 py-2 bg-indigo-900 text-white rounded hover:bg-blue-700'>
            Next
          </button>
        </div>
        {/* <CategoryBlock />
        <CategoryBlock />
        <CategoryBlock /> } */}

        {/* {showSession()} */}
      </main>
    </div>
  );
}
