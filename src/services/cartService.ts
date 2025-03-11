import { CartItem } from '@/types/types';
import { Session } from 'next-auth';

export const getCartItems = async (userId: string) => {
  try {
    const response = await fetch(`/api/cart?userId=${userId}`);
    if (!response.ok) {
      throw new Error('Error fetching cart items');
    }
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error('Error fetching cart items', error);
  }
};
export const updateCartInDB = async (
  updatedItems: CartItem[],
  session: Session | null
) => {
  try {
    const userId = session?.user?.id;
    if (!userId) return;

    await fetch(`/api/cart?userId=${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ items: updatedItems }),
    });
  } catch (error) {
    console.error('Error updating cart in database:', error);
  }
};

export const deleteCart = async (session: Session | null) => {
  try {
    const userId = session?.user?.id;
    if (!userId) return;

    await fetch(`/api/cart?userId=${userId}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Error deleting cart:', error);
  }
};
export const checkIfInCart = async (userId: string, bookId: string) => {
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
    return data.isInCart;
  } catch (error) {
    console.error('Failed to check if book is in cart:', error);
  }
};

export const addBookToCart = async (
  bookId: string,
  session: Session | null
) => {
  try {
    const userId = session?.user?.id;
    if (!userId || !bookId) return;

    const response = await fetch(
      `/api/cart?bookId=${bookId}&userId=${userId}`,
      {
        method: 'POST',
      }
    );

    if (!response.ok) {
      throw new Error('Failed to add book to cart');
    }

    const data = await response.json();
    return data.cart;
  } catch (error) {
    console.error('Error by adding to the card', error);
  }
};
