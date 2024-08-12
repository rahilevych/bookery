'use client';
import Navbar from '@/components/Navbar';
import { CaretLeft, Heart } from '@phosphor-icons/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useBooksContext } from '@/context/BookContext';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

type Props = {};

const DetailsPage = (props: Props) => {
  const { fetchOneBook, book } = useBooksContext();
  const { id } = useParams();
  const [text, setText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLiked, setIsLiked] = useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    if (id) {
      fetchOneBook(id.toString());
      checkIfLiked();
      fetchComments();
    }
  }, []);

  const handleInputChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  async function addComment() {
    try {
      const userId = session?.user?.id;
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const response = await fetch(
        `/api/comment?bookId=${id}&userId=${userId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: userId, book_id: id, text }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      await fetchComments();
    } catch (error) {
      console.log('Failed to add comment', error);
    }
  }

  async function fetchComments() {
    try {
      const res = await fetch(`/api/comment?bookId=${id}`);
      if (!res.ok) {
        throw new Error('Error fetching comments');
      }
      const data = await res.json();
      setComments(data.comments);
    } catch (error) {
      console.error('Error fetching comments', error);
    }
  }

  async function deleteComment(commentId: string) {
    try {
      const userId = session?.user?.id;
      const response = await fetch(
        `/api/comment?bookId=${id}&commentId=${commentId}&userId=${userId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }

      await fetchComments();
    } catch (error) {
      console.error('Failed to delete comment', error);
    }
  }

  const checkIfLiked = async () => {
    try {
      const userId = session?.user?.id;
      if (!userId || !id) return;

      const response = await fetch(
        `/api/isLiked?bookId=${id}&userId=${userId}`,
        {
          method: 'GET',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to like/unlike the book');
      }

      const data = await response.json();
      setIsLiked(data.isLiked);
      console.log('isLiked' + isLiked);
    } catch (error) {
      console.error('Failed to like/unlike the book:', error);
    }
  };

  const handleLike = async () => {
    try {
      const userId = session?.user?.id;
      if (!userId || !id) return;

      const response = await fetch(
        `/api/wishlist?bookId=${id}&userId=${userId}`,
        {
          method: 'POST',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to like/unlike the book');
      }

      const data = await response.json();
      setIsLiked(data.isLiked); // Обновляем состояние лайка
    } catch (error) {
      console.error('Failed to like/unlike the book:', error);
    }
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.trim() !== '' && id) {
      await addComment();
      setText('');
      if (id) {
        fetchOneBook(id.toString());
      }
    } else {
      console.error('Text or book ID is missing');
    }
  };

  return (
    <div className='bg-white mh-screen h-auto'>
      <Navbar />
      <div className='container mx-auto p-6'>
        <div className='flex flex-row w-full justify-between items-center mb-10'>
          <Link href={'/'}>
            <div className='flex flex-row items-center gap-5'>
              <button className='flex items-center justify-center'>
                <CaretLeft size={32} />
              </button>
              <p>Book Details</p>
            </div>
          </Link>

          <button
            onClick={handleLike}
            className={`flex items-center justify-center ${
              isLiked ? 'text-red-500' : 'text-gray-500'
            }`}>
            <Heart size={32} />
          </button>
        </div>

        <div className='flex flex-row items-start justify-between gap-10'>
          <div className='flex items-center justify-center p-3 bg-[#F4F4FF] rounded w-96 h-auto'>
            <img
              src={book?.thumbnail}
              alt='Book Thumbnail'
              className='w-80 h-auto'
            />
          </div>
          <div className='flex flex-col gap-10 w-1/2'>
            <div>
              <p className='text-xl font-bold'>{book?.title}</p>
              <p className='text-gray-700'>{book?.authors}</p>
            </div>

            <div>
              <p className='text-lg font-semibold'>Summary</p>
              <div className='text-gray-600'>{book?.description}</div>
            </div>
          </div>
        </div>

        <div className='max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-10'>
          <h2 className='text-2xl font-semibold mb-4'>Leave a Comment</h2>

          <form onSubmit={submitForm}>
            <div className='mb-4'>
              <label
                htmlFor='comment'
                className='block text-gray-700 text-sm font-bold mb-2'>
                Your Comment:
              </label>
              <input
                onChange={handleInputChangeComment}
                value={text}
                id='comment'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                placeholder='Write your comment here...'
              />
            </div>

            <div className='flex items-center justify-between'>
              <button
                type='submit'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                Submit
              </button>
            </div>
          </form>

          <div className='mt-8'>
            <h3 className='text-xl font-semibold mb-4'>Comments</h3>

            <div className='border-t border-gray-300 pt-4'>
              {comments && comments.length > 0 ? (
                comments.map((comment: any, index: number) => (
                  <div key={index} className='flex items-start mb-4'>
                    <div className='w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold mr-4'>
                      u
                    </div>
                    <div>
                      <p className='text-gray-800 font-semibold'>
                        {comment.user_id}
                      </p>
                      <p className='text-gray-600 mt-1'>{comment.text}</p>
                      {session?.user?.id === comment.user_id && (
                        <button
                          onClick={() => deleteComment(comment._id)}
                          className='text-red-500 mt-2'>
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className='text-gray-600'>No comments yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
