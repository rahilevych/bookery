'use client';
import React, { useEffect, useState } from 'react';
import BookPreview from '@/components/BookPreview';
import Navbar from '@/components/Navbar';
import Loader from '@/components/Loader';
import Search from '@/components/Search';
import { useBooksContext } from '@/context/BookContext';
import Link from 'next/link';

export default function Home() {
  const { fetchBooks, books, loading, pageNumber, setPageNumber } =
    useBooksContext();
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    fetchBooks().then(() => setDataLoaded(true));
  }, [pageNumber]);

  const handlePrevBtn = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleNextBtn = () => {
    setPageNumber(pageNumber + 1);
  };

  const handlePageClick = (page: number) => {
    setPageNumber(page);
  };

  const hasBooks = books.length > 0;
  const shouldShowNoBooksMessage = !loading && dataLoaded && !hasBooks;

  const totalPages = 20;

  const visiblePageNumbers = 5;
  const halfVisiblePages = Math.floor(visiblePageNumbers / 2);

  const getPageNumbers = () => {
    let startPage = Math.max(pageNumber - halfVisiblePages, 1);
    let endPage = Math.min(pageNumber + halfVisiblePages, totalPages);

    if (endPage - startPage + 1 < visiblePageNumbers) {
      startPage = Math.max(endPage - visiblePageNumbers + 1, 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  };

  return (
    <div className='bg-white flex flex-col min-h-screen'>
      <main className='flex flex-col items-center justify-between flex-grow container mx-auto px-4'>
        {loading && !dataLoaded ? (
          <Loader />
        ) : (
          <>
            {dataLoaded && (
              <div className='w-full max-w-3xl mx-auto mt-4 mb-8'>
                <Search />
              </div>
            )}
            {shouldShowNoBooksMessage ? (
              <p>No books found</p>
            ) : (
              <>
                <div className='flex flex-row flex-wrap items-center justify-center gap-8'>
                  {books.map((book) => (
                    <Link key={book._id} href={`book/${book._id}`}>
                      <BookPreview book={book} />
                    </Link>
                  ))}
                </div>

                {dataLoaded && (
                  <div className='flex justify-center gap-4 items-center w-full max-w-3xl mt-4 mb-8'>
                    <button
                      onClick={handlePrevBtn}
                      className='px-4 py-2 bg-[#6D28D9] text-white rounded-md transition-all duration-300 hover:bg-[#4C1D95]'>
                      Prev
                    </button>
                    <div className='flex gap-2'>
                      {pageNumber > visiblePageNumbers && (
                        <span className='px-4 py-2 text-[#6D28D9]'>...</span>
                      )}
                      {getPageNumbers().map((num) => (
                        <button
                          key={num}
                          onClick={() => handlePageClick(num)}
                          className={`px-4 py-2 rounded-md transition-all duration-300 ${
                            pageNumber === num
                              ? 'bg-[#6D28D9] text-white'
                              : 'bg-[#EDE9FE] text-[#6D28D9] hover:bg-[#D6BCFA]'
                          }`}>
                          {num}
                        </button>
                      ))}
                      {pageNumber < totalPages - visiblePageNumbers && (
                        <span className='px-4 py-2 text-[#6D28D9]'>...</span>
                      )}
                    </div>
                    <button
                      onClick={handleNextBtn}
                      className='px-4 py-2 bg-[#6D28D9] text-white rounded-md transition-all duration-300 hover:bg-[#4C1D95]'>
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}
