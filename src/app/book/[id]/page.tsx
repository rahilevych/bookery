'use client';
import Navbar from '@/components/Navbar';
import { CaretLeft, Heart, ShoppingCart, User } from '@phosphor-icons/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useBooksContext } from '@/context/BookContext';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useCartContext } from '@/context/CartContext';
import Loader from '@/components/Loader';
import toast from 'react-hot-toast'; // Импортируйте react-hot-toast

type Props = {};

const DetailsPage = (props: Props) => {
  const {
    fetchOneBook,
    book,
    checkIfInCart,
    checkIfLiked,
    setIsInCart,
    setIsLiked,
    isLiked,
    isInCart,
  } = useBooksContext();
  const { setCartItems } = useCartContext();
  const { id } = useParams();
  const [text, setText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (id) {
      fetchOneBook(id.toString());
      if (userId && book) {
        checkIfLiked(userId, id.toString());
        checkIfInCart(userId, id.toString());
      }
      fetchComments();
    }
  }, [id]);

  const handleInputChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  async function addComment() {
    if (!userId) {
      toast.error('Please register or log in to add a comment.');
      return;
    }

    try {
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

  const handleLike = async () => {
    if (!session?.user) {
      toast.error('Please register or log in to like this book.');
      return;
    }

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
      setIsLiked(data.isLiked);

      // toast.success('Book was added to wishlist!');
    } catch (error) {
      console.error('Failed to like/unlike the book:', error);
      toast.error('Failed to like/unlike the book:');
    }
  };

  const handleAddToCart = async () => {
    if (!session?.user) {
      toast.error('Please register or log in to add this book to your cart.');
      return;
    }

    try {
      const userId = session?.user?.id;
      if (!userId || !id) return;

      const response = await fetch(`/api/cart?bookId=${id}&userId=${userId}`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to add book to cart');
      }

      checkIfInCart(userId, id.toString());

      const data = await response.json();
      setCartItems(data.cart);
      toast.success('Book added to cart successfully!');
    } catch (error) {
      console.error('Error by adding to the card', error);
      toast.error('Failed to add book to cart');
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
    <div className='bg-white min-h-screen'>
      {book && book._id === id ? (
        <div className='container mx-auto p-6'>
          <div className='flex flex-row w-full justify-between items-center mb-6'>
            <Link href={'/'}>
              <div className='flex flex-row items-center gap-5'>
                <button className='flex items-center justify-center'>
                  <CaretLeft size={32} className='text-[#6D28D9]' />
                </button>
                <p className='text-xl font-semibold text-[#3A3A3A]'>
                  Books list
                </p>
              </div>
            </Link>

            <div className='flex items-center gap-4'>
              <button
                onClick={handleLike}
                className={`flex items-center justify-center p-2 ${
                  isLiked ? 'text-red-500' : 'text-gray-500'
                } transition-transform transform hover:scale-110 ${
                  !session?.user ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={!session?.user}>
                <Heart size={32} weight={isLiked ? 'fill' : 'regular'} />
              </button>
              <button
                onClick={handleAddToCart}
                className={`flex items-center justify-center p-2 ${
                  isInCart ? 'text-[#6D28D9]' : 'text-gray-500'
                } transition-transform transform hover:scale-110 ${
                  !session?.user ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={!session?.user}>
                <ShoppingCart
                  size={32}
                  weight={isInCart ? 'fill' : 'regular'}
                />
              </button>
            </div>
          </div>

          <div className='flex flex-col md:flex-row items-start gap-10'>
            <div className='flex flex-col w-full md:w-2/3 gap-6'>
              <div className='flex flex-col items-center md:items-start'>
                <img
                  src={book?.thumbnail}
                  alt='Book Thumbnail'
                  className='w-36 md:w-48 h-auto rounded-lg'
                />
              </div>

              <div>
                <p className='text-3xl font-bold text-[#3A3A3A] mb-2'>
                  {book?.title}
                </p>
                <p className='text-lg text-gray-600 mb-4'>{book?.authors}</p>
                <div className='bg-[#F4F4FF] p-4 rounded-lg shadow-md'>
                  <p className='text-xl font-semibold text-[#3A3A3A] mb-2'>
                    Summary
                  </p>
                  <p className='text-gray-700'>{book?.description}</p>
                </div>
              </div>
            </div>

            <div className='flex flex-col w-full md:w-1/3'>
              <div className='bg-white p-6 rounded-lg shadow-md h-full'>
                <h2 className='text-2xl font-semibold text-[#3A3A3A] mb-4'>
                  Leave a Comment
                </h2>

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
                      className='shadow-md appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      placeholder='Write your comment here...'
                    />
                  </div>

                  <div className='flex items-center justify-between'>
                    <button
                      type='submit'
                      className='bg-[#6D28D9] hover:bg-[#4a1f9e] text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline'>
                      Submit
                    </button>
                  </div>
                </form>

                <div className='mt-8'>
                  <h3 className='text-xl font-semibold text-[#3A3A3A] mb-4'>
                    Comments
                  </h3>

                  <div className='border-t border-gray-300 pt-4'>
                    {comments && comments.length > 0 ? (
                      comments.map((comment: any, index: number) => (
                        <div
                          key={index}
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
        </div>
      ) : (
        <Loader></Loader>
      )}
    </div>
  );
};

export default DetailsPage;
