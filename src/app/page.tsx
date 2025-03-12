'use client';
import React, { Suspense, useEffect, useState } from 'react';
import BookPreview from '@/components/BookPreview';
import Loader from '@/components/Loader';
import Search from '@/components/Search';

import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { fetchBooks } from '@/services/book.Service';
import Pagination from '@/components/Pagination';

export default function Home() {
  const { books, setBooks } = useApp();
  const booksProPage = 20;
  const [totalBooks, setTotalBooks] = useState<number>(0);
  const [text, setText] = useState<string>('');
  const [pageNumber, setPageNumber] = useState(1);

  const init = async () => {
    const data = await fetchBooks(pageNumber, booksProPage, text);
    console.log(data);
    setBooks(data.books);
    setTotalBooks(data.totalCount);
  };

  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage);
  };
  const handleInputChange = (text: string) => {
    setText(text);
    setPageNumber(1);
  };

  useEffect(() => {
    init();
  }, [pageNumber, text]);

  return (
    <div className='bg-white flex flex-col min-h-screen'>
      <main className='flex flex-col items-center justify-between flex-grow container mx-auto px-4'>
        <Suspense fallback={<Loader />}>
          <div className='w-full max-w-3xl mx-auto mt-4 mb-8'>
            <Search onInputChange={handleInputChange} text={text} />
          </div>
          <div className='flex flex-row flex-wrap items-center justify-center gap-8'>
            {books && books.length > 0 ? (
              books.map((book) => (
                <Link key={book._id} href={`book/${book._id}`}>
                  <BookPreview book={book} />
                </Link>
              ))
            ) : (
              <p>No books found</p>
            )}
          </div>
          <Pagination
            pageNumber={pageNumber}
            totalBooks={totalBooks}
            booksProPage={booksProPage}
            onPageChange={handlePageChange}
          />
        </Suspense>
      </main>
    </div>
  );
}
