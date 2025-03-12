import { deleteComment } from '@/services/commentService';
import { Comment } from '@/types/types';
import { User } from '@phosphor-icons/react';
import { useSession } from 'next-auth/react';
import React from 'react';

interface Props {
  comment: Comment;
  onCommentsUpdate: (commentId: Comment) => void;
}
const CommentItem = ({ comment, onCommentsUpdate }: Props) => {
  const { data: session } = useSession();

  const handleDeleteComment = async (currentComment: Comment) => {
    await deleteComment(currentComment._id, comment.book_id, session);
    onCommentsUpdate(currentComment);
  };

  return (
    <div
      key={comment._id}
      className='flex items-start mb-6 border-b border-gray-200 pb-4'>
      {comment.user_id?.avatar ? (
        <img
          src={comment.user_id.avatar}
          alt=''
          className='w-12 h-12  rounded-full flex items-center justify-center text-white font-bold mr-4'
        />
      ) : (
        <User
          size={12}
          className='w-12 h-12 rounded-full border-4 border-purple-500 object-cover'
        />
      )}

      <div>
        <p className='text-gray-800 font-semibold'>
          {comment.user_id.username}
        </p>
        <p className='text-gray-600 mt-1'>{comment.text}</p>
        {session?.user?.id === comment.user_id._id && (
          <button
            onClick={() => handleDeleteComment(comment)}
            className='text-red-500 mt-2'>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
