'use client';
import { BookDocument } from '@/models/Book';
import { Book } from '@/types/types';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  useState,
} from 'react';
type BookTypeContext = {
  input: string;
  setInput: (input: string) => void;
  bookId: string;
  setBookId: (input: string) => void;
  pageNumber: number;
  setPageNumber: (number: number) => void;
  fetchBooks: () => Promise<void>;
  searchBooks: () => Promise<void>;
  books: Book[];
  book: Book | null;

  setBook: (book: Book) => void;
  fetchOneBook: (bookId: string) => Promise<void>;
};
const BooksContext = createContext<BookTypeContext>({
  input: '',
  setInput: () => {
    throw new Error('context not initialised');
  },
  bookId: '',
  setBookId: () => {
    throw new Error('context not initialised');
  },
  pageNumber: 1,
  setPageNumber: () => {
    throw new Error('context not initialised');
  },
  searchBooks: () => Promise.resolve(),
  fetchBooks: () => Promise.resolve(),
  books: [],
  fetchOneBook: () => Promise.resolve(),
  setBook: () => {
    throw new Error('context not initialised');
  },
  book: null,
});

export function BooksWrapper({ children }: { children: React.ReactNode }) {
  const [input, setInput] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [amountOfItems, setAmountOfItems] = useState(20);
  const [bookId, setBookId] = useState('');
  const [book, setBook] = useState<Book | null>(null);

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

  async function fetchOneBook(id: string) {
    try {
      //const searchParams = useSearchParams();

      //const search = searchParams.get('bookId');

      //const { bookId } = search;
      console.log('id>>>>' + id);
      setBookId(id.toString());
      const res = await fetch(`/api/book?id=${id}`);

      if (!res.ok) {
        throw new Error('Erorr by getting book');
      }
      const data = await res.json();

      setBook(data.book);
    } catch (error) {
      console.error('Error by getting book', error);
    }
  }
  console.log('book>>>>>' + book);
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
        bookId,
        setBookId,
        setBook,
        fetchOneBook,
        book,
      }}>
      {children}
    </BooksContext.Provider>
  );
}

export function useBooksContext() {
  return useContext(BooksContext);
}
