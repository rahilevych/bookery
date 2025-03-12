import React from 'react';

interface Props {
  pageNumber: number;
  totalBooks: number;
  booksProPage: number;
  onPageChange: (newPage: number) => void;
}
const Pagination: React.FC<Props> = ({
  pageNumber,
  totalBooks,
  booksProPage,
  onPageChange,
}) => {
  const totalPages = totalBooks / booksProPage;
  const visiblePageNumbers = 5;
  const halfVisiblePages = Math.floor(visiblePageNumbers / 2);

  const handlePrevBtn = () => {
    if (pageNumber > 1) {
      onPageChange(pageNumber - 1);
    }
  };

  const handleNextBtn = () => {
    if (pageNumber <= totalPages) {
      onPageChange(pageNumber + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const getPageNumbers = () => {
    let startPage = Math.max(pageNumber - halfVisiblePages, 1);
    let endPage = Math.min(startPage + visiblePageNumbers - 1, totalPages);

    if (endPage - startPage + 1 < visiblePageNumbers) {
      startPage = Math.max(endPage - visiblePageNumbers + 1, 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  };
  return (
    <div className='flex justify-center gap-4 items-center w-full max-w-3xl mt-4 mb-8'>
      <button
        disabled={pageNumber === 1}
        onClick={handlePrevBtn}
        className={`px-4 py-2 rounded-md transition-all duration-300 ${
          pageNumber === 1
            ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
            : 'bg-[#6D28D9] text-white hover:bg-[#4C1D95]'
        }`}>
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
        disabled={pageNumber >= totalPages}
        onClick={handleNextBtn}
        className={`px-4 py-2 rounded-md transition-all duration-300 ${
          pageNumber >= totalPages
            ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
            : 'bg-[#6D28D9] text-white hover:bg-[#4C1D95]'
        }`}>
        Next
      </button>
    </div>
  );
};
export default Pagination;
