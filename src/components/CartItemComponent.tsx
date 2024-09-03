import { CartItem } from '@/types/types';
import { Trash } from '@phosphor-icons/react';
import Image from 'next/image'; // Импортируйте Image для работы с изображениями

interface CartItemComponentProps {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export default function CartItemComponent({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemComponentProps) {
  return (
    <div className='flex items-center p-4 bg-gray-100 rounded-lg shadow-md'>
      <div className='flex-shrink-0 w-20 h-20 mr-4'>
        <img
          src={item.bookId.thumbnail}
          alt={item.bookId.title}
          width={40}
          height={60}
          className='object-cover rounded'
        />
      </div>

      <div className='flex-1'>
        <h2 className='text-xl font-bold'>{item.bookId.title}</h2>
        <p className='text-gray-600'>
          Price: ${item.bookId.price ? item.bookId.price.toFixed(2) : '0.00'} x{' '}
          {item.amount} = $
          {item.bookId.price
            ? (item.bookId.price * item.amount).toFixed(2)
            : '0.00'}
        </p>
      </div>

      <div className='flex items-center ml-4'>
        <button
          onClick={onDecrease}
          className='bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700 transition'>
          -
        </button>
        <span className='mx-2 text-lg font-semibold'>{item.amount}</span>
        <button
          onClick={onIncrease}
          className='bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700 transition'>
          +
        </button>
      </div>

      <button
        onClick={onRemove}
        className='ml-4 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition'
        aria-label='Remove item'>
        <Trash size={20} />
      </button>
    </div>
  );
}
