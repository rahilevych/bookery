import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useApp } from '@/context/AppContext';
import {
  deleteCart,
  getCartItems,
  updateCartInDB,
} from '@/services/cartService';

export const useCart = () => {
  const { cartItems, setCartItems } = useApp();
  const { data: session } = useSession();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const userId = session?.user?.id;

  const updateCart = (updatedItems: any) => {
    setCartItems(updatedItems);
    updatedItems && updateCartInDB(updatedItems, session);
  };

  const handleIncrease = (id: string) => {
    const updatedItems = cartItems?.map((item) =>
      item.bookId._id === id ? { ...item, amount: item.amount + 1 } : item
    );
    updateCart(updatedItems);
  };

  const handleDecrease = (id: string) => {
    const updatedItems = cartItems?.map((item) =>
      item.bookId._id === id && item.amount > 1
        ? { ...item, amount: item.amount - 1 }
        : item
    );
    updateCart(updatedItems);
  };

  const handleRemove = (id: string) => {
    const updatedItems = cartItems?.filter((item) => item.bookId._id !== id);
    updateCart(updatedItems);
  };

  const handleCheckout = async () => {
    try {
      setShowConfirmation(true);
      await deleteCart(session);
    } catch (error) {
      console.error('Error deleting cart:', error);
    }
  };
  useEffect(() => {
    const init = async () => {
      if (userId) {
        const items = await getCartItems(userId);
        setCartItems(items);
      } else {
        setCartItems([]);
      }
    };
    init();
  }, [userId]);

  return {
    handleIncrease,
    handleDecrease,
    handleRemove,
    handleCheckout,
    showConfirmation,
    setShowConfirmation,
  };
};
