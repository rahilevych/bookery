import { Session } from 'next-auth';

export const fetchBooks = async (
  pageNumber: number,
  amountOfItems: number,
  input: string
) => {
  try {
    const response = await fetch(
      `/api/books?page=${pageNumber}&size=${amountOfItems}&query=${input}`
    );

    if (!response.ok) {
      throw new Error('Erorr by fetching books');
    }
    const data = await response.json();
    return data.books;
  } catch (error) {
    console.error('Error by fetching books', error);
  }
};

export const fetchOneBook = async (id: string) => {
  try {
    const response = await fetch(`/api/books/book?id=${id}`);

    if (!response.ok) {
      throw new Error('Erorr by getting book');
    }
    const data = await response.json();
    return data.book;
  } catch (error) {
    console.error('Error by getting book', error);
  }
};
export const searchBooks = async (input: string) => {
  try {
    const response = await fetch(`/api/books/book?query=${input}`);

    if (!response.ok) {
      throw new Error('Erorr by fetching books');
    }
    const data = await response.json();
    return data.books;
  } catch (error) {
    console.error('Error by fetching books', error);
  }
};

export const checkIfLiked = async (userId: string, bookId: string) => {
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
    return data.isLiked;
  } catch (error) {
    console.error('Failed to check if book is liked:', error);
  }
};

export const deleteBook = async (userId: string, bookId: string) => {
  try {
    const response = await fetch(
      `/api/wishlist?userId=${userId}&bookId=${bookId}`,
      {
        method: 'DELETE',
      }
    );
    if (!response.ok) {
      throw new Error('Erorr by deleting books');
    }
  } catch (error) {
    console.error('Error removing book from wish list:', error);
  }
};

export const getLikedBooks = async (userId: string) => {
  try {
    const response = await fetch(`/api/wishlist?userId=${userId}`, {
      method: 'GET',
    });

    if (!response.ok) throw new Error('Failed to fetch wish list');
    const data = await response.json();
    return data.books;
  } catch (error) {
    console.error('Error fetching wish list:', error);
  }
};

export const likeBook = async (bookId: string, session: Session | null) => {
  try {
    const userId = session?.user?.id;
    if (!userId || !bookId) return;

    const response = await fetch(
      `/api/wishlist?bookId=${bookId}&userId=${userId}`,
      {
        method: 'POST',
      }
    );
    if (!response.ok) {
      throw new Error('Failed to like/unlike the book');
    }
    const data = await response.json();
    return data.isLiked;
  } catch (error) {
    console.error('Failed to like/unlike the book:', error);
  }
};
