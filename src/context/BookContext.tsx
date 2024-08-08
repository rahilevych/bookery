'use client';
import { BookDocument } from '@/models/Book';
import { ReactNode, createContext, useContext, useState } from 'react';
type BookTypeContext = {
  input: string;
  setInput: (input: string) => void;
  pageNumber: number;
  setPageNumber: (number: number) => void;
  fetchBooks: () => Promise<void>;
  searchBooks: () => Promise<void>;
  books: BookDocument[];
};
const BooksContext = createContext<BookTypeContext>({
  input: '',
  setInput: () => {
    throw new Error('context not initialised');
  },
  pageNumber: 1,
  setPageNumber: () => {
    throw new Error('context not initialised');
  },
  searchBooks: () => Promise.resolve(),
  fetchBooks: () => Promise.resolve(),
  books: [],
});

export function BooksWrapper({ children }: { children: React.ReactNode }) {
  const [input, setInput] = useState('');
  const [books, setBooks] = useState<BookDocument[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [amountOfItems, setAmountOfItems] = useState(20);

  async function fetchBooks() {
    console.log('pageB sizeB', pageNumber, amountOfItems);
    try {
      const res = await fetch(
        `/api/books?page=${pageNumber}&size=${amountOfItems}&query=${input}`
      );

      if (!res.ok) {
        throw new Error('Erorr by fetching books');
      }
      const data = await res.json();

      setBooks(data.books);
    } catch (error) {
      console.error('Error by fetching books', error);
    }
  }
  async function searchBooks() {
    try {
      const res = await fetch(`/api/book?query=${input}`);

      if (!res.ok) {
        throw new Error('Erorr by fetching books');
      }
      const data = await res.json();

      setBooks(data.books);
      console.log('books after searching' + books);
    } catch (error) {
      console.error('Error by fetching books', error);
    }
  }
  return (
    <BooksContext.Provider
      value={{
        input,
        setInput,
        searchBooks,
        fetchBooks,
        pageNumber,
        setPageNumber,
        books,
      }}>
      {children}
    </BooksContext.Provider>
  );
}

export function useBooksContext() {
  return useContext(BooksContext);
}
