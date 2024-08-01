'use client';
import { FormEvent, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { register } from '@/actions/register';
import logo from '../../img/logo.png';
import formImg from '../../img/login.png';

export default function Register() {
  const [error, setError] = useState<string>();
  const router = useRouter();
  const ref = useRef<HTMLFormElement>(null);
  const handleSubmit = async (formData: FormData) => {
    const r = await register({
      email: formData.get('email'),
      password: formData.get('password'),
      name: formData.get('name'),
      surname: formData.get('surname'),
      username: formData.get('username'),
    });
    ref.current?.reset();
    if (r?.error) {
      setError(r.error);
      return;
    } else {
      return router.push('/login');
    }
  };
  return (
    <section className='w-full h-screen flex items-center justify-center bg-violet-50'>
      <div className='w-4/5 h-3/5 flex flex-row items-center justify-center  md:w-3/5  '>
        <div className=' hidden h-full   lg:block '>
          {' '}
          <img src={formImg.src} alt='' className=' w-auto h-full' />
        </div>
        <div className='w-full h-full bg-white  flex flex-col justify-center items-center gap-0  md:w-96  '>
          <div>
            {' '}
            <img src={logo.src} alt='' className='h-7 w-auto' />
          </div>

          <form
            ref={ref}
            className=' p-2 gap-2 w-full h-auto  flex flex-col justify-between items-center
            bg-white  md:p-6 gap-4  '
            action={handleSubmit}>
            {error && <div className='text-black'>{error}</div>}
            <h1 className='mb-5 w-full text-2xl font-bold text-center'>
              Register
            </h1>
            <div className='w-full p-2 sm:w-4/5 flex flex-col gap-2'>
              <label className='w-full text-sm'>E-mail</label>
              <input
                type='email'
                placeholder='Email'
                className='w-full h-10  rounded p-4 bg-[#F4F4FF]'
                name='email'
              />
            </div>
            <div className='w-full p-2 sm:w-4/5 flex flex-col gap-2'>
              <label className='w-full text-sm'>Username</label>
              <input
                type='text'
                placeholder='Username'
                className='w-full h-10  rounded p-4 bg-[#F4F4FF]'
                name='username'
              />
            </div>
            <div className='w-full p-2 sm:w-4/5 flex flex-col gap-2'>
              {' '}
              <label className='w-full text-sm'>Password</label>
              <div className='flex w-full'>
                <input
                  type='password'
                  placeholder='Password'
                  className='w-full h-10 rounded p-4 bg-[#F4F4FF]'
                  name='password'
                />
              </div>
            </div>

            <button className='w-full p-3 sm:w-4/5 h-auto bg-[#EF6B4A]  rounded text-white p-3'>
              Register
            </button>

            <Link
              href='/login'
              className='text-sm text-[#6251DD] transition duration-150 ease hover:text-black'>
              Already have an account?
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
}
