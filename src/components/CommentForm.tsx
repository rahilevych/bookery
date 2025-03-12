import { postComment } from '@/services/commentService';
import { Comment } from '@/types/types';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  bookId: string;
  onCommentsUpdate: (currentComment: Comment) => void;
}

const CommentForm = ({ onCommentsUpdate, bookId }: Props) => {
  const [text, setText] = useState('');
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const handleAddComment = async () => {
    if (!userId) {
      toast.error('Please register or log in to add a comment.');
      return;
    }
    const newComment = await postComment(bookId, userId, text);
    onCommentsUpdate(newComment);
  };
  const handleInputChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim() !== '' && bookId) {
      await handleAddComment();
      setText('');
    } else {
      console.error('Text or book ID is missing');
    }
  };

  return (
    <form onSubmit={submitForm} className='w-full max-w-lg mx-auto'>
      <div className='mb-4'>
        <label
          htmlFor='comment'
          className='block text-gray-700 text-sm sm:text-base font-bold mb-2'>
          Your Comment:
        </label>
        <input
          onChange={handleInputChangeComment}
          value={text}
          id='comment'
          className='shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm sm:text-base'
          placeholder='Write your comment here...'
        />
      </div>

      <div className='flex items-center justify-between'>
        <button
          type='submit'
          className='bg-[#6D28D9] hover:bg-[#4a1f9e] text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full sm:w-auto'>
          Submit
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
