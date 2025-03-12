'use client';
import { getAllComments } from '@/services/commentService';
import React, { useEffect, useState } from 'react';
import CommentItem from './CommentItem';
import { Comment } from '@/types/types';
import CommentForm from './CommentForm';
interface Props {
  bookId: string;
}
const CommentsList = ({ bookId }: Props) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async () => {
    const comments = await getAllComments(bookId);
    setComments(comments);
  };

  const handleUpdateComments = (currentComment: Comment) => {
    setComments((prevComments) => {
      const isExist = prevComments.some(
        (comment) => comment._id === currentComment._id
      );

      return isExist
        ? prevComments.filter((comment) => comment._id !== currentComment._id)
        : [...prevComments, currentComment];
    });
  };

  useEffect(() => {
    fetchComments();
  }, [bookId, comments.length]);

  return (
    <div className='flex flex-col w-[80%]'>
      <div className='bg-white p-6 rounded-lg shadow-md h-full'>
        <h2 className='text-lg sm:text-xl md:text-2xl font-semibold text-[#3A3A3A] mb-4'>
          Leave a comment
        </h2>

        <CommentForm bookId={bookId} onCommentsUpdate={handleUpdateComments} />
        <div className='mt-8'>
          <h3 className='text-xl font-semibold text-[#3A3A3A] mb-4'>
            Comments
          </h3>

          <div className='border-t border-gray-300 pt-4 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200'>
            {comments && comments.length > 0 ? (
              comments.map((comment: any) => (
                <CommentItem
                  comment={comment}
                  onCommentsUpdate={handleUpdateComments}
                />
              ))
            ) : (
              <p className='text-gray-600'>No comments yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsList;
