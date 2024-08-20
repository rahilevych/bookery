'use client';
import { BookDocument } from '@/models/Book';
import { Book } from '@/types/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { ReactNode, createContext, useContext, useState } from 'react';

type BookTypeContext = {
  input: string;
  setInput: (input: string) => void;
  bookId: string;
  setBookId: (input: string) => void;
  pageNumber: number;
  setPageNumber: (number: number) => void;
  fetchBooks: () => Promise<void>;
  searchBooks: () => Promise<void>;
  checkIfLiked: (userId: string, bookId: string) => Promise<void>;
  checkIfInCart: (userId: string, bookId: string) => Promise<void>;
  books: Book[];
  book: Book | null;
  setBook: (book: Book) => void;
  setIsLiked: (isLiked: boolean) => void;
  setIsInCart: (isInCart: boolean) => void;
  fetchOneBook: (bookId: string) => Promise<void>;
  loading: boolean;
  isInCart: boolean;
  isLiked: boolean;
};
const BooksContext = createContext<BookTypeContext>({
  input: '',
  setInput: () => {
    throw new Error('context not initialised');
  },
  setIsInCart: () => {
    throw new Error('context not initialised');
  },
  setIsLiked: () => {
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
  checkIfInCart: () => Promise.resolve(),
  checkIfLiked: () => Promise.resolve(),
  setBook: () => {
    throw new Error('context not initialised');
  },
  book: null,
  loading: false,
  isLiked: false,
  isInCart: false,
});

export function BooksWrapper({ children }: { children: React.ReactNode }) {
  const [input, setInput] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [amountOfItems, setAmountOfItems] = useState(20);
  const [bookId, setBookId] = useState('');
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  async function fetchBooks() {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/books?page=${pageNumber}&size=${amountOfItems}&query=${input}`
      );

      if (!res.ok) {
        throw new Error('Erorr by fetching books');
      }
      const data = await res.json();

      setBooks(data.books);

      setLoading(false);
    } catch (error) {
      console.error('Error by fetching books', error);
    }
  }

  async function fetchOneBook(id: string) {
    try {
      console.log('id>>>>' + id);
      setBookId(id.toString());
      const res = await fetch(`/api/books/book?id=${id}`);

      if (!res.ok) {
        throw new Error('Erorr by getting book');
      }
      const data = await res.json();

      setBook(data.book);
    } catch (error) {
      console.error('Error by getting book', error);
    }
  }
  async function searchBooks() {
    try {
      const res = await fetch(`/api/books/book?query=${input}`);

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

  const checkIfLiked = async (userId: string, bookId: string) => {
    try {
      if (!userId || !bookId) return;

      const response = await fetch(
        `/api/books/book/isLiked?bookId=${bookId}&userId=${userId}`,
        {
          method: 'GET',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to check if book is liked');
      }

      const data = await response.json();
      setIsLiked(data.isLiked);
    } catch (error) {
      console.error('Failed to check if book is liked:', error);
    }
  };

  const checkIfInCart = async (userId: string, bookId: string) => {
    try {
      if (!userId || !bookId) return;

      const response = await fetch(
        `/api/cart/isInCart?bookId=${bookId}&userId=${userId}`,
        {
          method: 'GET',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to check if book is in cart');
      }

      const data = await response.json();
      setIsInCart(data.isInCart);
    } catch (error) {
      console.error('Failed to check if book is in cart:', error);
    }
  };

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
        loading,
        checkIfInCart,
        checkIfLiked,
        setIsInCart,
        setIsLiked,
        isLiked,
        isInCart,
      }}>
      {children}
    </BooksContext.Provider>
  );
}

export function useBooksContext() {
  return useContext(BooksContext);
}
