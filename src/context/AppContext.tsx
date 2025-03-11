'use client';
import { BookDocument } from '@/models/Book';
import { Book, CartItem } from '@/types/types';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

type AppTypeContext = {
  books: Book[] | null;
  setBooks: Dispatch<SetStateAction<Book[] | null>>;
  setIsInCart: Dispatch<SetStateAction<boolean>>;
  setIsLiked: Dispatch<SetStateAction<boolean>>;
  isInCart: boolean;
  isLiked: boolean;
  cartItems: CartItem[] | null;
  setCartItems: Dispatch<SetStateAction<CartItem[] | null>>;
};
const AppContext = createContext<AppTypeContext | undefined>(undefined);

type AppContextProviderProps = {
  children: ReactNode;
};
export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[] | null>(null);
  return (
    <AppContext.Provider
      value={{
        books,
        setBooks,
        isLiked,
        isInCart,
        setIsLiked,
        setIsInCart,
        cartItems,
        setCartItems,
      }}>
      {children}
    </AppContext.Provider>
  );
};

// export function BooksWrapper({ children }: { children: React.ReactNode }) {
//   const [input, setInput] = useState('');

//   const [pageNumber, setPageNumber] = useState(1);
//   const [amountOfItems, setAmountOfItems] = useState(20);
//   const [bookId, setBookId] = useState('');
//   const [book, setBook] = useState<Book | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   async function fetchBooks() {
//     setLoading(true);
//     try {
//       const res = await fetch(
//         `/api/books?page=${pageNumber}&size=${amountOfItems}&query=${input}`
//       );

//       if (!res.ok) {
//         throw new Error('Erorr by fetching books');
//       }
//       const data = await res.json();

//       setBooks(data.books);

//       setLoading(false);
//     } catch (error) {
//       console.error('Error by fetching books', error);
//     }
//   }

//   async function fetchOneBook(id: string) {
//     try {
//       console.log('id>>>>' + id);
//       setBookId(id.toString());
//       const res = await fetch(`/api/books/book?id=${id}`);

//       if (!res.ok) {
//         throw new Error('Erorr by getting book');
//       }
//       const data = await res.json();

//       setBook(data.book);
//     } catch (error) {
//       console.error('Error by getting book', error);
//     }
//   }
//   async function searchBooks() {
//     try {
//       const res = await fetch(`/api/books/book?query=${input}`);

//       if (!res.ok) {
//         throw new Error('Erorr by fetching books');
//       }
//       const data = await res.json();

//       setBooks(data.books);
//       console.log('books after searching' + books);
//     } catch (error) {
//       console.error('Error by fetching books', error);
//     }
//   }

//   const checkIfLiked = async (userId: string, bookId: string) => {
//     try {
//       if (!userId || !bookId) return;

//       const response = await fetch(
//         `/api/books/book/isLiked?bookId=${bookId}&userId=${userId}`,
//         {
//           method: 'GET',
//         }
//       );

//       if (!response.ok) {
//         throw new Error('Failed to check if book is liked');
//       }

//       const data = await response.json();
//       setIsLiked(data.isLiked);
//     } catch (error) {
//       console.error('Failed to check if book is liked:', error);
//     }
//   };

//   const checkIfInCart = async (userId: string, bookId: string) => {
//     try {
//       if (!userId || !bookId) return;

//       const response = await fetch(
//         `/api/cart/isInCart?bookId=${bookId}&userId=${userId}`,
//         {
//           method: 'GET',
//         }
//       );

//       if (!response.ok) {
//         throw new Error('Failed to check if book is in cart');
//       }

//       const data = await response.json();
//       setIsInCart(data.isInCart);
//     } catch (error) {
//       console.error('Failed to check if book is in cart:', error);
//     }
//   };

//   return (
//     <AppContext.Provider
//       value={{
//         books,
//         isLiked,
//         isInCart,
//       }}>
//       {children}
//     </AppContext.Provider>
//   );
// }

// export function useAppContext() {
//   return useContext(BooksContext);
// }
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('Use app context within provider!');
  return context;
};
