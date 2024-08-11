'use client';
import Navbar from '@/components/Navbar';
import { CaretLeft, Heart } from '@phosphor-icons/react';
import React, { useEffect, useState } from 'react';
import bookImg from '../../../img/bookImg.png'; // Возможно, это не используется
import { useParams } from 'next/navigation';
import { useBooksContext } from '@/context/BookContext';
import Link from 'next/link';

type Props = {};

const DetailsPage = (props: Props) => {
  const { fetchOneBook, book } = useBooksContext();
  const { id } = useParams();
  const [text, setText] = useState('');

  useEffect(() => {
    if (id) {
      fetchOneBook(id.toString());
      console.log('bookID>>>>' + id);
    }
  }, []);

  const handleInputChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  async function addComment() {
    try {
      await fetch(`/api/book?id=${id}`);
    } catch (error) {
      console.log('Failed to delete the pet.');
    }
  }

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (book && text.trim() !== '' && id) {
      const formData = new FormData();
      formData.append('text', text);
      //formData.append('user_id', user._id);
      formData.append('book_id', book._id);

      await addComment();
      // await getCommentsByIds(post.comments);
      // await getPostById(id);
      setText('');
    } else {
      console.error('User, post or text is missing');
    }
  };
  return (
    <div className='bg-white  mh-screen h-auto'>
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

          <div>
            <Heart size={32} />
          </div>
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
                id='comment'
                // rows={4}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                placeholder='Write your comment here...'></input>
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
              <div className='flex items-start mb-4'>
                <div className='w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold mr-4'>
                  A
                </div>
                <div>
                  <p className='text-gray-800 font-semibold'>Alice</p>
                  <p className='text-gray-600 mt-1'>
                    This book was a fantastic read! I loved the characters and
                    the plot twists.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
