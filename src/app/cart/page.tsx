'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import CartItemComponent from '@/components/CartItemComponent';
import { useApp } from '@/context/AppContext';
import {
  deleteCart,
  getCartItems,
  updateCartInDB,
} from '@/services/cartService';

export default function CartPage() {
  const { cartItems, setCartItems } = useApp();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { data: session } = useSession();
  const userId = session?.user.id;

  const init = async () => {
    if (session?.user.id) {
      const items = await getCartItems(session?.user?.id);
      setCartItems(items);
    } else {
      setCartItems([]);
    }
  };

  const handleIncrease = (id: string) => {
    const updatedItems =
      cartItems &&
      cartItems.map((item) =>
        item.bookId._id === id ? { ...item, amount: item.amount + 1 } : item
      );
    setCartItems(updatedItems);
    updatedItems && updateCartInDB(updatedItems, session);
  };

  const handleDecrease = (id: string) => {
    const updatedItems =
      cartItems &&
      cartItems.map((item) =>
        item.bookId._id === id && item.amount > 1
          ? { ...item, amount: item.amount - 1 }
          : item
      );
    setCartItems(updatedItems);
    updatedItems && updateCartInDB(updatedItems, session);
  };

  const handleRemove = (id: string) => {
    const updatedItems =
      cartItems && cartItems.filter((item) => item.bookId._id !== id);
    setCartItems(updatedItems);
    updatedItems && updateCartInDB(updatedItems, session);
  };

  const totalPrice =
    cartItems &&
    cartItems.reduce(
      (total, item) => total + item.bookId.price * item.amount,
      0
    );

  const handleCheckout = async () => {
    try {
      setShowConfirmation(true);
      await deleteCart(session);
    } catch (error) {
      console.error('Error deleting cart:', error);
    }
  };

  useEffect(() => {
    init();
  }, [session]);

  return (
    <div className='bg-gray-100 min-h-screen flex flex-col pt-6'>
      {userId ? (
        <div className='container mx-auto p-6 bg-white rounded-lg shadow-md'>
          <h1 className='text-3xl font-bold mb-6 text-purple-800'>
            Shopping Cart
          </h1>
          {cartItems && cartItems.length === 0 ? (
            <p className='text-gray-600'>Your cart is empty.</p>
          ) : (
            <>
              <div className='space-y-4'>
                {cartItems &&
                  cartItems.map((item) => (
                    <CartItemComponent
                      key={item.bookId._id}
                      item={item}
                      onIncrease={() => handleIncrease(item.bookId._id)}
                      onDecrease={() => handleDecrease(item.bookId._id)}
                      onRemove={() => handleRemove(item.bookId._id)}
                    />
                  ))}
              </div>
              <div className='mt-6 text-right'>
                <h2 className='text-2xl font-bold text-gray-800'>
                  Total: ${totalPrice && totalPrice.toFixed(2)}
                </h2>
                <button
                  onClick={handleCheckout}
                  className='mt-4 px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition'>
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <Link href='/login'>
          <div className='flex justify-center items-center h-[60vh]'>
            <p className='text-center text-2xl text-[#6D28D9] font-semibold text-[#6D28D9] hover:text-[#4c2c9a] transition duration-150'>
              You need to log in to view or modify your cart. Please register or
              sign in.
            </p>
          </div>
        </Link>
      )}

      {showConfirmation && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-bold mb-4 text-gray-800'>
              Order Successful!
            </h2>
            <p className='text-gray-600'>Thank you for your purchase.</p>
            <Link href='/'>
              {' '}
              <button className='mt-4 px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition'>
                Close
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
