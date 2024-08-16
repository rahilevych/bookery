'use client';
import { Book, CartItem } from '@/types/types';
import { useSession } from 'next-auth/react';
import { createContext, useContext, useEffect, useState } from 'react';

type CartContextType = {
  cartItems: CartItem[];

  getCartItems: (userId: string) => Promise<void>;
  handleIncrease: (id: string) => void;
  handleDecrease: (id: string) => void;
  handleRemove: (id: string) => void;
  setCartItems: (items: CartItem[]) => void;
};

const CartContext = createContext<CartContextType>({
  cartItems: [],
  setCartItems: () => {
    throw new Error('context not initialised');
  },
  getCartItems: () => Promise.resolve(),
  handleIncrease: () => {},
  handleDecrease: () => {},
  handleRemove: () => {},
});

export function CartWrapper({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (session?.user?.id) {
      getCartItems(session.user.id);
    } else {
      setCartItems([]);
    }
  }, [session]);

  async function getCartItems(userId: string) {
    try {
      const res = await fetch(`/api/cart?userId=${userId}`);
      if (!res.ok) {
        throw new Error('Error fetching cart items');
      }
      const data = await res.json();
      setCartItems(data.items);
    } catch (error) {
      console.error('Error fetching cart items', error);
    }
  }

  const handleIncrease = (id: string) => {
    const updatedItems = cartItems.map((item) =>
      item.bookId._id === id ? { ...item, amount: item.amount + 1 } : item
    );
    setCartItems(updatedItems);
    updateCartInDB(updatedItems);
  };

  const handleDecrease = (id: string) => {
    const updatedItems = cartItems.map((item) =>
      item.bookId._id === id && item.amount > 1
        ? { ...item, amount: item.amount - 1 }
        : item
    );
    setCartItems(updatedItems);
    updateCartInDB(updatedItems);
  };

  const handleRemove = (id: string) => {
    const updatedItems = cartItems.filter((item) => item.bookId._id !== id);
    setCartItems(updatedItems);
    updateCartInDB(updatedItems);
  };

  async function updateCartInDB(updatedItems: CartItem[]) {
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
  }

  return (
    <CartContext.Provider
      value={{
        getCartItems,
        cartItems,
        handleIncrease,
        handleDecrease,
        handleRemove,
        setCartItems,
      }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}
