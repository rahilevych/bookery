'use client';
import { FormEvent, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { register } from '@/actions/register';
import formImg from '../../img/login.png';
import toast from 'react-hot-toast';

export default function Register() {
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const result = await register({
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      name: formData.get('name') as string,
      surname: formData.get('surname') as string,
      username: formData.get('username') as string,
    });

    ref.current?.reset();
    if (result?.error) {
      setError(result.error as string);
      toast.error(result.error as string);
    } else {
      toast.success('Successfully registered!');
      router.push('/login');
    }
  };

  return (
    <section className='w-full h-screen flex items-center justify-center bg-[#F0F4F8]'>
      <div className='w-full max-w-4xl h-4/6 flex flex-row items-center justify-center bg-white shadow-lg rounded-lg overflow-hidden'>
        <div className='hidden lg:block lg:w-1/2 h-full'>
          <img
            src={formImg.src}
            alt='Register Image'
            className='w-full h-full object-cover'
          />
        </div>
        <div className='w-full lg:w-1/2 flex flex-col justify-center items-center p-8'>
          <div className='mb-8 text-center'>
            <h1 className='text-3xl font-semibold text-[#6D28D9]'>Bookery</h1>
            <p className='text-sm text-gray-600'>Create your account</p>
          </div>

          <form
            ref={ref}
            className='w-full max-w-sm bg-white shadow-md rounded-lg p-8'
            onSubmit={handleSubmit}>
            {error && <div className='mb-4 text-red-600'>{error}</div>}
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                E-mail
              </label>
              <input
                type='email'
                placeholder='Email'
                className='w-full h-12 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6D28D9]'
                name='email'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Username
              </label>
              <input
                type='text'
                placeholder='Username'
                className='w-full h-12 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6D28D9]'
                name='username'
                required
              />
            </div>
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Password
              </label>
              <input
                type='password'
                placeholder='Password'
                className='w-full h-12 border border-gray-300 rounded-lg px-4 py-2 bg-[#F4F4FF] focus:outline-none focus:ring-2 focus:ring-[#6D28D9]'
                name='password'
                required
              />
            </div>

            <button className='w-full h-12 bg-[#6D28D9] text-white font-semibold rounded-lg hover:bg-[#4c2c9a] transition duration-150'>
              Register
            </button>
            <div className='mt-4 text-center'>
              <Link
                href='/login'
                className='text-sm text-[#6D28D9] hover:text-[#4c2c9a] transition duration-150'>
                Already have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
